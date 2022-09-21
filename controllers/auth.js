require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// const verifyToken = require('../middleware/auth')

const User = require('../models/user');

async function index (req,res) {
    try{
        console.log('getting users - line 15')
        const users = await User.all
        res.json({users})
    } catch (err){
        res.status(500).json({err})
    }
}

async function register (req, res) {
    try {
        console.log('grabbing username and pw')
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log('hashing and salting pw')
        await User.create({...req.body, password: hashedPassword})
        console.log('running register function - line 27')
        res.status(201).send({msg: 'User created'})
    } catch (err) {
      res.status(500).send(`Error: ${err}`)
    }
  }

async function login (req, res) {
    try {
        console.log('Running login function- line 36')
      const user = await User.findByEmail(req.body.email)
      console.log(user)
      // console.log(`request: ${req.body.email}`)
      // console.log(`request: ${req.body.password}`)
      // console.log(user.password_digest)
      if (user == null) {
        return res.status(400).send('Cannot find user')
      } else if(await bcrypt.compare(req.body.password, user.password_digest)) {
        res.status(200).json({email: user.email, id: user.id, username: user.username})
        console.log('Success')

        if (!!authed){
            const payload = { username: user.user_name, email: user.email }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
        }
        jwt.sign(payload, process.env.SECRET, { expiresIn: 120}, sendToken);

      } else {
        res.send('Not Allowed')
        console.log('Not Allowed')
      }
    }
    } catch (err) {
      res.status(401).send(`Error: ${err}`)
    }
  }

// async function register (req, res) {
//     try {
//       console.log('finding user by id - line 73')
//       const user = await User.findByEmail(req.body.email)
//       console.log(user)
//       console.log(`request: ${req.body.email}`)
//       console.log(`request: ${req.body.password}`)
//       console.log(user.password_digest)
// }

module.exports = {index, register, login}


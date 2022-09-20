require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// const verifyToken = require('../middleware/auth')

const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      await User.create({...req.body, password: hashedPassword})
      res.status(201).send({msg: 'User created'})
    } catch (err) {
      res.status(500).send(`Error: ${err}`)
    }
  })

router.post('/login', async (req, res) => {
   
    try {
      const user = await User.findByEmail(req.body.email)
      console.log(user)
      console.log(`request: ${req.body.email}`)
      console.log(`request: ${req.body.password}`)
      console.log(user.password_digest)
      if (user == null) {
        return res.status(400).send('Cannot find user')
      } else if(await bcrypt.compare(req.body.password, user.password_digest)) {
        res.status(200).json({user: user.email})
        console.log('Success')

        if (!!authed){
            const payload = { username: user.username, email: user.email }
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
  })

  module.exports = router


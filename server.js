const cors = require('cors')
const express = require('express');
const server = express()

server.use(cors())
server.use(express.json())

const postsRoutes = require ('./routes/habits')
const userRoutes = require ('./routers/users')

server.use('/posts', postsRoutes)
server.use('/users', userRoutes)

server.get('/', (req,res) => res.send('Welcome to Habits'))

module.exports = server

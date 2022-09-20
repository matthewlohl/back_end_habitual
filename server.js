const express = require('express')
const cors = require('cors')


const server = express();

server.use(cors())
server.use(express.json())

const habitsRoutes = require ('./routes/habits')
const userRoutes = require ('./routers/users')

server.use('/habits', habitsRoutes)
server.use('/users', userRoutes)

server.get('/', (req,res) => res.send('Welcome to Habits'))

module.exports = server

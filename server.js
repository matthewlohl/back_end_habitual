const express = require('express')
const cors = require('cors')
<<<<<<< HEAD


const server = express();
=======
const server = express();

>>>>>>> be216c2fa99775d97d8078dadff9d6675cb0839e

server.use(cors())
server.use(express.json())

<<<<<<< HEAD
const habitsRoutes = require ('./routes/habits')
const userRoutes = require ('./routers/users')

server.use('/habits', habitsRoutes)
server.use('/users', userRoutes)
=======

const habitsRoutes = require ('./routes/habits')

server.use('/habits', habitsRoutes)

//const userRoutes = require ('./routers/users')

server.use('/users', userRoutes)

>>>>>>> be216c2fa99775d97d8078dadff9d6675cb0839e

server.get('/', (req,res) => res.send('Welcome to Habits'))

module.exports = server

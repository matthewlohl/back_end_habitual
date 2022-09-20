const express = require('express')
const cors = require('cors')
<<<<<<< HEAD

const server = express();
=======
const express = require('express');
const server = express()
>>>>>>> 6ea0091222128e5f3f39845b294eebf15eb611e4

server.use(cors())
server.use(express.json())

<<<<<<< HEAD
const habitsRoutes = require ('./routes/habits')

server.use('/habits', habitsRoutes)
=======
const postsRoutes = require ('./routes/habits')
const userRoutes = require ('./routers/users')

server.use('/posts', postsRoutes)
server.use('/users', userRoutes)
>>>>>>> 6ea0091222128e5f3f39845b294eebf15eb611e4

server.get('/', (req,res) => res.send('Welcome to Habits'))

module.exports = server

const cors = require('cors')

const server = express()

server.use(cors())
server.use(express.json())

const postsRoutes = require ('./routes/habits')

server.use('/posts', postsRoutes)

server.get('/', (req,res) => res.send('Welcome to Habits'))

module.exports = server

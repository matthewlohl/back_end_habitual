const express = require('express');
const router = express.Router();
// const usersControllers = require('../controllers/users')
const authControllers = require('../controllers/auth')

router.get('/', authControllers.index)
router.post('/register', authControllers.register)
router.post('/login', authControllers.login)
// router.delete('/:id', usersControllers.destroy)

module.exports = router;

const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users')

router.get('/', usersControllers.index)
router.get('/:id', usersControllers.show)
router.post('/', usersControllers.update)
router.delete('/:id', usersControllers.destroy)

module.exports = router;

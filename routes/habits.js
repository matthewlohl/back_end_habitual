const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.index)
router.get('/:id', habitsController.show)
router.get('/user/:id', habitsController.getuserhabits)
router.patch('/:id', habitsController.patch)
router.post('/', habitsController.create)
router.delete('/:id', habitsController.destroy)

module.exports = router;

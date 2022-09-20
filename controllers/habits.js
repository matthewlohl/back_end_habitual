const Habit = require('../models/habit')

async function index (req, res) {

  try {
    const habits = await Habit.all;
    res.status(200).json(habits)
  } catch (err) {
    res.status(500).json({err})
  }

}

async function show (req, res) {

  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    res.status(200).json(habit)

  } catch (err) {
    res.status(404).json({err})
  }
}

async function create (req, res) {

  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit)
  } catch (err) {
    res.status(422).json({err})
  }
}

async function update (req, res) {

  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    const updateHabit = await habit.update(req.body.title, req.body.author, req.body.body)
    res.status(202).json({habit: updateHabit})
  } catch (err) {
    res.status(500).json({err})
  }
}

async function destroy (req, res) {

  try {
    const habit = await Habit.findById(parseInt(req.params.id));
    const resp = await habit.delete;
    res.status(204).end()
  } catch (err) {
    res.status(404).json({err})
  }
}

async function patch (req, res) {

  try{
    const habit = await Habit.patch()
    res.status(200).json(habit)
  } catch (err) {
    res.status(500).json({err})
  }
}


module.exports = {index, show, create, update, destroy, patch}

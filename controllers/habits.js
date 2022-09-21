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

async function getuserhabits (req, res){
  try{
    const userhabit = await Habit.findHabitsByUserId(parseInt(req.params.id));
    res.status(200).json(userhabit)

  } catch(err){
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
    const ID = (parseInt(req.params.id))
    const habit = await Habit.findById(ID);
    console.log(Object.keys(req.body)[0])
    if (Object.keys(req.body)[0] === "frequency_done"){
      const updateHabit = await habit.patch(ID);
      res.status(200).json(updateHabit)
    }else{
      const updateHabit = await habit.patch2(ID, req.body.date_complete)
      res.status(200).json(updateHabit)
    }
  } catch (err) {
    res.status(500).json({err})
  }
}



module.exports = {index, show, getuserhabits, create, update, destroy, patch}


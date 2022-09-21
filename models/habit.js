const db = require ('../dbConfig/init');
const SQL = require('sql-template-strings')

class Habit {
    constructor(data){
        this.id = data.id;
        this.habit_name = data.habit_name;
        this.dateComplete = data.date_complete;
        this.period = data.period;
        this.frequency = data.frequency;
        this.frequencyDone = data.frequencyDone;
        // this.user = {user: data.user_name, path: `users/${data.user_id}`}

    }

    static get all() {
        return new Promise (async (res, rej) => {
            try{
                const habitsData = await db.run(SQL `SELECT * FROM habits;`)
                const habits = habitsData.rows.map(d => new Habit(d))
                res(habits);
            } catch (err){
                rej (`Error retrieving habits: ${err}`)
            }
        })
    }

    static findById (id){
        return new Promise (async(res, rej)=> {
            try{

                let habitsData = await db.run(SQL `SELECT * FROM habits WHERE habits.id = $1;`, [id]);
                let habit = new Habit(habitsData.rows[0])

                res(habit);
            }catch(err){
                rej(`Error retrieving habits with id ${id}- Error: ${err}`)
            }
        })
    }


    static async create({habit, frequency}){

        return new Promise (async (res, rej) => {
            try{
                let habitData =  await db.run(SQL `INSERT INTO habits (habit_name, frequency) VALUES ($1, $2) RETURNING *;`, [ habit, frequency ]);
                res (habitData.rows[0]);

            } catch(err){
                reject(`Error creating habit Error:${err}`)
            }
        })
    }

    patch() {
        return new Promise (async (res, rej) => {
            try{
                let updatedHabitData = await db.run(SQL `UPDATE habits SET frequencyDone = $1 WHERE id = $2 RETURNING *;`,[this.frequencyDone + 1, this.id]);
                let updatedHabit = new Habit(updatedHabitData.rows[0])
                res(updatedHabit);
            }catch (err){
                rej(`Error updating habit: ${err}`);
            }
        })
    }

    delete() {
        return new Promise (async(res, rej) => {
            try{
                await db.run(SQL `DELETE FROM habits WHERE id = $1;`, [this.id]);
                res('Habit was deleted')
            } catch (err){
                rej(`Error deleting habit: ${err}`)
            }
        })
    }
}

module.exports = Habit;

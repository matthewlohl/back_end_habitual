const db = require ('../dbConfig/init');
const SQL = require('sql-template-strings');
const { patch } = require('../controllers/habits');

class Habit {
    constructor(data){
        this.id = data.id
        this.habit_name = data.habit_name
        this.date_complete = data.date_complete
        this.period = data.period
        this.frequency = data.frequency
        this.frequency_done = data.frequency_done
        this.userid = {user: data.user_name, path: `users/${data.user_id}`}

    }

    static get all() {
        return new Promise (async (res, rej) => {
            try{
                const habitsData = await db.query(`SELECT * FROM habits;`)
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

                let habitsData = await db.query(`SELECT * FROM habits WHERE habits.id = $1;`, [id]);
                let habit = new Habit(habitsData.rows[0])

                res(habit);
            }catch(err){
                rej(`Error retrieving habits with id ${id}- Error: ${err}`)
            }
        })
    }

    static findHabitsByUserId (userid){
        return new Promise (async(res, rej) => {
            try{
                console.log(`Finding habits from user ${userid}`)
                let userHabits = await db.query(`SELECT * FROM habits WHERE user_id = $1;`, [userid]);
                const habits = userHabits.rows.map(d => new Habit(d))
                res(habits);
            } catch(err){
                rej(`Error retrieving habits from userid ${userid}- Error: ${err}`)
            }
        })
    }


    static async create({habit_name, period, frequency, date_complete, frequency_done, userid}){

        return new Promise (async (res, rej) => {
            try{
                let habitData =  await db.query(`INSERT INTO habits (habit_name, period, frequency, date_complete, frequency_done, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [ habit_name, period, frequency, date_complete, frequency_done, userid]);
                console.log(`${userid} - line 62`)
                res (habitData.rows[0]);

            } catch(err){
                rej(`Error creating habit Error:${err}`)
            }
        })
    }

    patch(id) {
        return new Promise (async (res, rej) => {
            try{
                let updatedHabitData = await db.query(`UPDATE habits SET frequency_done = frequency_done + 1 WHERE id = $1;`,[id]);
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
                await db.query('DELETE FROM habits WHERE id = $1;', [this.id]);
                res('Habit was deleted')
            } catch (err){
                rej(`Error deleting habit: ${err}`)
            }
        })
    }


    patch2(id, completion) {
        return new Promise (async (res, rej) => {
            try{
                let updatedHabitData = await db.query(`UPDATE habits SET date_complete = array_append(date_complete, $1)  WHERE id = $2;`,[completion, id]);
                let updatedHabit = new Habit(updatedHabitData.rows[0])

                res(updatedHabit);
            }catch (err){
                rej(`Error updating habit: ${err}`);
            }
        })
    }
}
    


module.exports = Habit;

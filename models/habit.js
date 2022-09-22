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
        this.streak = data.streak
        this.userid = {user: data.user_name, path: `users/${data.user_id}`}

    }

    static get all() {
        return new Promise (async (res, rej) => {
            try{
                // check month then week then day - 
                const currentDate = await db.query(`SELECT period AS period, CURRENT_DATE::date - date_complete::date AS difference FROM habits;`)
                const currentDate2 = await db.query('SELECT period AS period,EXTRACT(WEEK FROM CURRENT_DATE::date) - EXTRACT(WEEK FROM date_complete::date) AS difference FROM habits;')
                const currentDate3 = await db.query('SELECT period AS period,EXTRACT(MONTH FROM CURRENT_DATE::date) - EXTRACT(MONTH FROM date_complete::date) AS difference FROM habits;')
                console.log(currentDate2.rows)
                console.log((currentDate.rows).some(el => el.difference >= 1))
                if ((currentDate.rows).some(el => el.difference >= 1 && el.period == 1)){

                    await db.query(`UPDATE habits SET frequency_done = 0, date_complete = CURRENT_DATE WHERE period = 1;`)
                    const habitsData = await db.query(`SELECT * FROM habits;`);
                    const habits = habitsData.rows.map(d => new Habit(d));
                    res(habits);
                }else if ((currentDate2.rows).some(el => el.difference >= 1 && el.period == 2)){

                    await db.query(`UPDATE habits SET frequency_done = 0, date_complete = CURRENT_DATE WHERE period = 2;`);
                    const habitsData = await db.query(`SELECT * FROM habits;`);
                    const habits = habitsData.rows.map(d => new Habit(d));
                    res(habits);
                }else if ((currentDate3.rows).some(el => el.difference >= 1 && el.period == 3)){

                    await db.query(`UPDATE habits SET frequency_done = 0, date_complete = CURRENT_DATE WHERE period = 3;`);
                    const habitsData = await db.query(`SELECT * FROM habits;`);
                    const habits = habitsData.rows.map(d => new Habit(d));
                    res(habits);
                }else{
                    const habitsData = await db.query(`SELECT * FROM habits;`);
                    const habits = habitsData.rows.map(d => new Habit(d));
                    res(habits);
                }

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


    static async create({habit_name, period, frequency, frequency_done, userid}){

        return new Promise (async (res, rej) => {
            try{
                let habitData =  await db.query(`INSERT INTO habits (habit_name, period, frequency, date_complete, frequency_done, user_id) VALUES ($1, $2, $3, CURRENT_DATE, $4, $5) RETURNING *;`, [ habit_name, period, frequency, frequency_done, userid]);
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
                let updatedHabitData = await db.query(`UPDATE habits SET frequency_done = frequency_done + 1, date_complete = CURRENT_DATE WHERE id = $1;`,[id]);
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


    patch2(id) {
        return new Promise (async (res, rej) => {
            try{
                

                let updatedHabitData = await db.query(`UPDATE habits SET streak = streak + 1 WHERE id = $1;`,[id]);
                let updatedHabit = new Habit(updatedHabitData.rows[0])
                
                res(updatedHabit);
            }catch (err){
                rej(`Error updating habit: ${err}`);
            }
        })
    }
}
    


module.exports = Habit;

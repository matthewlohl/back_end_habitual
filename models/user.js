const db = require('../dbConfig/init')
const SQL = require('sql-template-strings')

class User {
    constructor (data){
        this.username = data.user_name
        this.email = data.email
        this.password_digest = data.password_digest
    }


    static get all(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await db.run(SQL `SELECT * FROM users;`)
                const users = result.rows.map(r => new User(r))
                resolve(users)
            }
            catch (err) {
                reject(`Error retrieving users: ${err}`)
            }
        })
    }

    static create({ user_name, email, password }){
        return new Promise(async (res, rej) => {
            try {
                console.log('inserting new users')
                let result = await db.run(SQL`INSERT INTO users (user_name, email, password_digest)
                                                VALUES (${user_name}, ${email}, ${password}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }


    static findByEmail(email){
        return new Promise(async (resolve, reject) => {
            try{
                console.log(`Finding ${email} to login`)
                let result = await db.run(SQL `SELECT * FROM users WHERE email = ${email};`)
                let user = new User(result.rows[0])
                resolve(user)
            }
            catch (err) {
                reject(`Error retrieving users: ${err}`)
            }
        })
    }
}

module.exports = User

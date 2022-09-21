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
                const result = await db.query(`SELECT * FROM users;`)
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
                let result = await db.query(`INSERT INTO users (user_name, email, password_digest)
                                                VALUES ($1,$2,$3) RETURNING *;`, [user_name, email, password]);
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
                let result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
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

const db = require('../dbConfig/init')
const SQL = require('sql-template-strings')

class User {
    constructor (data){
        this.username = data.user_name
        this.email = data.email
        this.passwordDigest = data.password_digest
    }


    static get all(){
        return new Promise(async (resolve, reject) => {
            try{
                let result = await db.run( SQL`SELECT * FROM users;`)
                let users = result.rows.map(r => new User(r))
                resolve(users)
            }
            catch (err) {
                reject(`Error retrieving users: ${err}`)
            }
        })
    }


    static findByEmail(email){
        return new Promise(async (resolve, reject) => {
            try{
                let result = await db.run(SQL `SELECT * FROM users WHERE email = ${email};`)
                let user = new User(result.row[0])
                resolve(user)
            }
            catch (err) {
                reject(`Error retrieving users: ${err}`)
            }
        })
    }
}

module.exports = User

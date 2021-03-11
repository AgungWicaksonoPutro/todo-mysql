const connection = require('../configs/db')
const { actionQuery } = require('../helpers/responses')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO users SET ?', data, (err, result)=>{
                if(!err) return resolve(result)
                else return reject(new Error(err))
            })
        })
    },
    emailChecked: (email) =>{
        return actionQuery('SELECT * FROM users WHERE email = ?', email)
    }
}
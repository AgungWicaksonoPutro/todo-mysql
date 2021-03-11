require('dotenv').config()
const bcrypt = require('bcryptjs')
const { register, emailChecked } = require('../models/users')
const { response } = require('../helpers/responses')
const { userActivate } = require('../middlewares/mailer')


module.exports = {
    register: (req, res) => {
        const{userName, email, password, roleId} = req.body
        const data = {
            userName,
            email,
            password,
            avatar: 'https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png',
            confirmed: 0,
            roleId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        emailChecked(data.email)
            .then((result)=>{
                if(result.length >= 1){
                    response(res, {msg: 'email already registered!'}, 402, null)
                } else {
                    bcrypt.genSalt(10, (err, salt)=>{
                        if(err) throw err
                        bcrypt.hash(data.password, salt, (err, hash)=>{
                            if(err) throw err
                            data.password = hash
                            register(data)
                                .then((result)=>{
                                    userActivate(data.email)
                                    .then(()=>{
                                        const registered = {
                                            _id : result.insertId,
                                            msg : 'Success! Cek Email To Activation..'
                                        }
                                        response(res, registered, 200, null);
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                        })
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    login: (req, res) => {
        const {email, password} = req.body
    }
}
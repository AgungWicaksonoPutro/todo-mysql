const express = require('express')
const route = express.Router()
const { register } = require('../controllers/users')

route
    .post('/register', register)

module.exports = route
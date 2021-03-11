require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./src/routes/index')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1/todolist/', routes)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('Server Running On Port ' + PORT)
})
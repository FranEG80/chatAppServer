const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const mongoose = require('mongoose')

require('dotenv').config()


const cors = require('./configs/cors.config.js')

const indexRouter = require('./routes/index.route')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(cors)

app.use('/', indexRouter)

// Error 404
app.use((req, res, next) => next(createError(404, 'Action not found. Check the documentation')))

// Error handling
app.use((error, req, res, next) => {
    console.error(error)
    res.status(error.status || 500)

    const data = { message: error.message }

    if (error instanceof Mongoose.Error.ValidationError) {
        res.status(400)
        data.errors = {}
        Object.keys(error.errors).forEach(field => data.errors[field] = error.errors[field].message)
    }
    res.json(data)
})
module.exports = app

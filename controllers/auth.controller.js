const User = require('../models/user.model')
const createError = require('http-errors')
const passport = require('passport')

module.exports.register = (req, res, next) => {
    const { username, email } = req.body

    User.findOne({ $or: [{username}, {email}]})
        .then(user => {
            if (user) {
                throw createError(409, 'Email or username already regsitered')
            } else {
                new User(req.body).save()
            }
        })
        .then(user => res.status(201).json(user))
        .catch(next)
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('auth-local', (error, user, message) => {
        if (error) {
            next(error)
        } else if (!user) {
            next(createError(401, message))
        } else {
            req.login(user, error => error ? next(error) : res.status(201).json(user))
        }
    })(req, res, next)
}

module.exports.logout = (req, res, next) => {
    req.logout()
    res.status(204).json()
}
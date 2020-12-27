const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

passport.serializeUser((user, next) => next(null, user.id))
passport.deserializeUser((id, next) => User.findById(id).then(user => next(null, user)).catch(next))

passport.use('auth-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, next) => {
    User.findOne({email})
        .then(user => {
            if (!user) {
                next(null, false, 'Invalide email or password')
            } else {
                return user.checkPassword(password)
                    .then(match => !match ? next(null, false, 'Invalid email or password') : next(null, user))
            }
        })
        .catch(next)
}))
const createError = require('http-errors')

module.exports.isAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : next(createError(401))
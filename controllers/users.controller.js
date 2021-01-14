const User = require("../models/user.model");
const createError = require("http-errors");
const passport = require("passport");

module.exports.getUsers = (req, res, next) => {
  User.find().lean()
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
    User.findOne({_id: req.dispatch.get('id')})
        .then(user => res.json(user))
        .catch(next)
}

//TODO delUser

//TODO updateUser
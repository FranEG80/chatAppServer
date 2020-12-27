const User = require("../models/user.model");
const createError = require("http-errors");
const passport = require("passport");

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
};

//TODO delUser

//TODO updateUser
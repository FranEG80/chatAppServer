const express = require("express");
const router = express.Router();

const secure = require('../middlewares/secure.mid')
const authController = require('../controllers/users.controller')


// only for testing purposes
router.get('/getUsers', secure.isAuthenticated, authController.getUsers)

module.exports = router;

const express = require("express");
const router = express.Router();

const secure = require('../middlewares/secure.mid')
const authController = require('../controllers/users.controller')


// only for testing purposes
router.get('/', secure.isAuthenticated, authController.getUsers)
router.get('/:id', secure.isAuthenticated, authController.getUser)

module.exports = router;

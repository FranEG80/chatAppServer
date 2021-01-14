const express = require("express");
const router = express.Router();

const secure = require('../middlewares/secure.mid')
const authController = require('../controllers/users.controller')

//* check all routes if isAuthenticated
router.all('*', secure.isAuthenticated)

router.get('/:id', authController.getUser)

//! only for testing purposes
router.get('/', authController.getUsers)

module.exports = router;

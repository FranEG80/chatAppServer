const express = require("express");
const router = express.Router();

const secure = require('../middlewares/secure.mid')
const authController = require('../controllers/auth.controller')

router.post('/register', authController.register)
router.post('/login', authController.authenticate)
router.post('/logout', secure.isAuthenticated, authController.logout)

module.exports = router;

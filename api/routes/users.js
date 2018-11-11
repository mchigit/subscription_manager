const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authController = new AuthController();


router.post('/register', authController.registerUser);
router.post('/login', authController.userLogin);
module.exports = router;

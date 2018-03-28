const express = require('express');
const router = express.Router();
const { register, loginFB, login } = require('../controllers/users.controller');

/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.post('/fb-login', loginFB);

module.exports = router;

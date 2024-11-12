const express = require('express');
const router = express.Router()
const { getUserByEmailAndPassword, addUser, sendMail } = require('../controllers/userController');
const { validateToken } = require('../authUtils');

router.post('/login',getUserByEmailAndPassword);
router.post('/signup', addUser);
router.post("/sendmail", sendMail);


module.exports = router;
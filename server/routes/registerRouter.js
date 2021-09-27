const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const authUserController = require('../controllers/authUserController');
const router = express.Router();


//checks if token is existing, if all info provided, if user registered - sends status false
//if not registered - changes status to registered, gets name, encrypts password and stores everything in auth_table
//creates jwt and sends it in cookie

router.post('/register', authUserController.createUser, cookieController.createSession, (req, res) => {
  return res.status(200).json({ name: res.locals.user.name, email:res.locals.user.email });
});

module.exports = router;
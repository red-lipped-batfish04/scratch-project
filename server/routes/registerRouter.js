const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const authUserController = require('../controllers/authUserController');
const router = express.Router();


// register and creates user, create session cookie

router.post('/register', authUserController.createUser, (req, res) => {
  return res.status(200).json({ name: res.locals.user.name, email:res.locals.user.email });
});

module.exports = router;
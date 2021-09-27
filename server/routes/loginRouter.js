const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const authUserController = require('../controllers/authUserController');

const router = express.Router();
  
// verify user email and password, create cookie and store   
router.post('/login', authUserController.verifyUser, cookieController.createSession, (req, res) => {
  const response = {
    name: res.locals.user.name,
    email: res.locals.user.email,
  };
  return res.status(200).json(response);
});

module.exports = router;
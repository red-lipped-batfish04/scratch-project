const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');
const router = express.Router();
  
// verify user email and password, create session cookie and store   
router.post('/', userController.verifyUser, (req, res) => {
  const response = res.locals.user
  if (res.locals.registrationStatus === false) {
    return res.status(404).send('User not found');
  }
  return res.status(200).json(response);
});

module.exports = router;
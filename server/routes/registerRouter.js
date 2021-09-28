const express = require('express');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');
const router = express.Router();


// register and creates user, create session cookie

router.post('/', userController.createUser, (req, res) => {
  const response = res.locals.user
  if (res.locals.registrationStatus === false) {
    return res.status(404).send('Please register again');
  } else {
    return res.status(200).json(response);
  }
});

module.exports = router;
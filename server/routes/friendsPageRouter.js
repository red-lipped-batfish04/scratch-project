const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers,(req, res) => {
  const allUsers = res.locals.allUsers;
  console.log('friends in server>>>',allUsers);
  if (allUsers) {
    
    return res.status(200).json(allUsers);
  }else{
    return res.json('err in get all users in server.js');
  }

});  

router.get('/', (req, res, next) => {
  // first invoke controller to get list of all users (stretch: all friends), along with their stats
  // return list

});

router.post('/', (req, res, next) => {
  // first invoke controller to make friend request
  // return confirmation

});

router.put('/', (req, res, next) => {
  // first invoke controller to confirm friend request
  // return confirmation

});

module.exports = router;
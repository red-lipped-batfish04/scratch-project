const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController');


router.get('/', userController.getAllUsers,(req, res) => {
  const allUsers = res.locals.allUsers;
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

router.post('/:id',userController.addFriendRequest, (req, res, next) => {
  const friendId = res.locals.friendId;
  if (friendId) {
    console.log('get friendId',friendId)
    return res.status(200).json(friendId);
  }else{
    console.log('NOT get friendId',friendId)
    return res.json('err in post friend in server.js');
  }

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
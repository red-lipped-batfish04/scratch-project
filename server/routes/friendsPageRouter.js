const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // first invoke controller to get list of all users (stretch: all friends), along with their stats
  // return list

});

router.post('/addFriend', (req, res, next) => {
  // first invoke controller to make friend request
  // return confirmation

});

router.put('/addFriend', (req, res, next) => {
  // first invoke controller to confirm friend request
  // return confirmation

});
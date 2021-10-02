const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController.js');
const helperController = require('../controllers/helperController.js');


router.put('/', helperController.updateNotCompleted, helperController.updateCompleted, helperController.incrementToday, (req, res, next) => {
  return res.send();
})

module.exports = router;
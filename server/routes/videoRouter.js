const express = require('express');
const router = express.Router();
// import { videoController } from '../controllers/videoController.js';
const videoController = require('../controllers/videoController.js');


router.get('/', (req, res, next) => {
  // invoke controller to retrieve video of specified name (only if recorded_for_id matches current user ID)
  // return video, ideally as stream
  
})

router.post('/', (req, res, next) => {
  // invoke controller to get recorded_for_id (if recording for self, then it's the current user's id (email). otherwise it's a friend's id (email))
  // first invoke controller to save video to database's HD & make entry in videos table
  // return confirmation

})

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
// import { userController } from '../controllers/userController.js';
const helperController = require('../controllers/helperController.js');
// import { helperController } from '../controllers/helperController.js';
const videoController = require('../controllers/videoController.js');
// import { videoController } from '../controllers/videoController.js';



router.get('/', userController.getMyHabits, userController.myTodayGoals, userController.checkProgress, (req, res, next) => {
  // first invoke controller to retrieve list of all habits at current date for current user
  // return list
  const user=res.locals.user;
  const myHabits=res.locals.myHabits;
  console.log('myHabits',myHabits);
  return res.status(200).json(myHabits);
});
  
router.post('/addHabit', helperController.getToday, userController.addHabit, userController.getMyHabits, userController.myTodayGoals, (req, res, next) => {
  // first invoke controller to write to DB info for new habit
  // return updated list of today's goals
  return res.status(200).json(res.locals.myHabits);
});

router.put('/completed/:id', userController.setOneHabitStatus, (req, res, next) => {
  return res.status(200).send(res.locals.habitStatus);
});

router.get('/settings', (req, res, next) => { //stretch
  // first invoke middleware to retrieve all the user's account settings
  // return all user's current settings (so we can display their current selections)

});

router.put('/settings', (req, res, next) => { //stretch
  // first invoke controller to write to DB updated settings info 
  // return confirmation w new settings info to re-render page
});


module.exports = router;
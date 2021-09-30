const express = require('express');
const router = express.Router();
import { userController } from '../controllers/userController.js';
import { helperController } from '../controllers/helperController.js';

router.get('/', (req, res, next) => {
  // first invoke controller to retrieve list of all habits at current date for current user: need habit name & completed_status
  // return list

});

router.get('/settings', (req, res, next) => { //stretch
  // first invoke middleware to retrieve all the user's account settings
  // return all user's current settings (so we can display their current selections)

});

router.put('/settings', (req, res, next) => { //stretch
  // first invoke controller to write to DB updated settings info 
  // return confirmation w new settings info to re-render page
});

router.post('/addHabit', helperController.getToday, userController.addHabit, (req, res, next) => {
  // first invoke controller to write to DB info for new habit
  // return confirmation

});

router.put('/completed/:id', (req, res, next) => {
  // first invoke contoller to update completed_today (toggle)
  // use req.params.id to refer to the correct habit. id should === habit_id (habit name)

});

module.exports = router;
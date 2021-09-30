const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.getMyHabits, (req, res, next) => {
  // first invoke controller to retrieve list of all habits at current date for current user: need habit name & completed_status
  // return list
  const user=res.locals.user;
  const myHabits=res.locals.myHabits;
  console.log('myHabits',myHabits);
  
  if (myHabits) {
    
    return res.status(200).json(myHabits);
  }else{
    return res.json('err in get habits in server.js');
  }
 


});
  

router.get('/settings', (req, res, next) => {
  // first invoke middleware to retrieve all the user's account settings
  // return all user's current settings (so we can display their current selections)

});

router.put('/settings', (req, res, next) => {
  // first invoke controller to write to DB updated settings info 
  // return confirmation w new settings info to re-render page
});

router.post('/addHabit', (req, res, next) => {
  // first invoke controller to write to DB info for new habit
  // return confirmation

});

router.put('/completed/:id', (req, res, next) => {
  // first invoke contoller to update completed_today (toggle)
  // use req.params.id to refer to the correct habit. id should === habit_id (habit name)

});

module.exports = router;
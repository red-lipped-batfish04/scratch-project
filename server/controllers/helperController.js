const bcrypt = require('bcrypt');
const db = require('../models/usersDatabaseModels.js');

const helperController = {};


helperController.getToday = async (req, res, next) => {
  try {
    const today = db.query('SELECT today FROM today');
    res.locals.today = today;
    return next();
  } catch (err) {
    return next({'err': err, message: 'getToday query failed in helperController.getToday'});
  }
}

helperController.updateNotCompleted = async (req, res, next) => {
   // UPDATE all entries in users_habits_join where completed_today = false: increment its days_missed value and reset days_since_missed to 0
   db.query('')
}

helperController.updateCompleted = async (req, res, next) => {
  // UPDATE all entries in users_habits_join where completed_today = true: increment its total_days_achieved and days_since_missed values
    // set all completed_today values to false
}


module.exports = helperController;
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


module.exports = helperController;
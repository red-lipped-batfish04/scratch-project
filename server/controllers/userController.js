const userController = {};
const db = require('../models/db.js');


// userController.signUp = async (req, res, next) => {
//   const { name, email, password, signUpTime, phoneNumber, darkmodeSetting } = req.body;
//   try {
//     const queryString = 'SELECT name FROM habits WHERE name = $1' //TODO: write out query string to create a new entry in users with input data from client
//     await db.query(queryString);
//     return next();
//   } catch (err) {
//     return next({'err': err, message: 'db query failed in userController.signUp'})
//   }
// };

userController.deleteAccount = async (req, res, next) => {}; //stretch


userController.addHabit = async (req, res, next) => {
  const { habitName } = req.body;
  const getHabitQuery = 'SELECT name FROM habits WHERE name = $1' //TODO: query string to check habits table for habitName
  try {
    const habitExists = await db.query(getHabitQuery, [habitName]).rows[0] === 'habitQuery'; //WHAT IS THE RETURNED DATA TYPE??
    if (!habitExists) {
      const setHabitQuery = 'INSERT INTO habits (name) VALUES $1';
      try {
        await db.query(setHabitQuery, [habitName]);
      } catch (setQueryError) {
        return next({'err': setQueryError, message: 'setHabit query failed in userController.addHabit'})
      }
    }
  } catch (getQueryError) {
    return next({'err': getQueryError, message: 'getHabit query failed in userController.addHabit'})
  }
  const userHabitJoinQuery = '';
  try {
    db.query(userHabitJoinQuery, [])
  } catch (setUserHabitJoinError) {
    return next({'err': setUserHabitJoinError, message: 'getHabit query failed in userController.addHabit'})
  }

};

userController.setOneHabitStatus = async (req, res, next) => {};

userController.resetAllHabitStatus = async (req, res, next) => {};


userController.saveVideo = async (req, res, next) => {};

userController.deleteVideo = async (req, res, next) => {}; //stretch


userController.makeFriendRequest = async (req, res, next) => {};

userController.acceptFriendRequest = async (req, res, next) => {};

userController.removeFriend = async (req, res, next) => {};


userController.changeDarkmodeSetting = async (req, res, next) => {};

userController.changePushNotificationSetting = async (req, res, next) => {};

userController.changeTextNotificationSetting = async (req, res, next) => {}; //stretch


module.exports = userController;
const bcrypt = require('bcrypt');
const db = require('../models/usersDatabaseModels.js');


const userController = {};

// create user controller for registerRouter
userController.createUser = async (req, res, next) => {
  try {
    const SALT_WORK_FACTOR = 10;
    // pull out name, email, password & phone number from request body registration page
    const { name, email, password, phoneNumber } = req.body;

    // if name, email or password are null, registration status is false
    if (password === null || email === null || name === null) {
      res.locals.registrationStatus = false;
      return next();
    }

    // generate salt and bcrypt password
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const crypt_password = await bcrypt.hash(password, salt);

    // query for current time (need for time zone)
    const timeQuery = `SELECT NOW();`
    const timeResults = await db.query(timeQuery);
    const time = timeResults.rows[0].now;

    // add user to database 
    const addUserQuery = `INSERT INTO users (name, email, password, phone_number, timezone, darkmode_setting)
    VALUES ($1, $2, $3, $4, $5, $6);`;
    const values = [ name, email, crypt_password, phoneNumber, time, true ];
    const addedUser = await db.query(addUserQuery, values);
    
    // store user in res.locals
    res.locals.user = { name: name, email: email };
    res.locals.registrationStatus = true;
    return next();
  }
  catch (error) {
    return res.redirect('/login');
  }
};

// verify user controller for loginRouter
userController.verifyUser = async (req, res, next) => {
  try {
    // users will login with email and password, deconstruct from request body
    const { email, password } = req.body;

    // database query to find user
    const findUserQuery = `SELECT password, name
    FROM users WHERE email = $1;`;
    const value = [email] ;
    const returnedQuery = await db.query(findUserQuery, value);
    console.log(returnedQuery.rows[0])

    // if returned results does not give back user, redirect back to register page:
    if (returnedQuery.rows[0] === undefined) {
      res.locals.registrationStatus = false;
      return next();
    }

    // take returned hashed password from query and compare to entered password from login req.body 
    const hashedPassword = returnedQuery.rows[0].password;
    const verify = await bcrypt.compare(password, hashedPassword);
  
    // if verification is false, redirect to login page
    if (verify === false) {
      res.locals.registrationStatus = false;
      return next();
    }
  
    else {
      res.locals.user = {
        name: returnedQuery.rows[0]['name'],
        email: returnedQuery.rows[0]['email'],
      };
      res.locals.registrationStatus = true;

      return next();
    }
  }

  catch (error) {
    return next (error);
  }
};





userController.deleteAccount = async (req, res, next) => {}; //stretch


userController.addHabit = async (req, res, next) => {
  const { habitName } = req.body;
  const getHabitQuery = 'SELECT name FROM habits WHERE name = $1' //query string to check habits table for habitName
  try {
    const habitExists = await db.query(getHabitQuery, [habitName]).rows[0] === 'habitQuery'; //WHAT IS THE RETURNED DATA TYPE?? ####THIS MAY BE BROKEN
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

  const userHabitJoinQuery = 'INSERT INTO users_habits_join (users_id, habits_id, habit_start_day, habit_frequency) VALUES $1, $2, $3, $4'; // is it ok to leave the rest of these blank? my hope is that they will default to their default values
  try {
    db.query(userHabitJoinQuery, [req.cookies.email, habitName, res.locals.today, req.body.habit_frequency])
    next();
  }
  catch (setUserHabitJoinError) {
      return next({'err': setUserHabitJoinError, message: 'getHabit query failed in userController.addHabit'})
  }
};

userController.getAllUsers = async(req, res, next) => {
  const getAllUsersQuery = 'SELECT name FROM users'; 
  const allUsers = await db.query(getAllUsersQuery,[])
  console.log('allusers >>>>',allUsers)
  res.locals.allUsers = allUsers.rows;
  return next();

}


userController.setOneHabitStatus = async (req, res, next) => {
  const{ completedToday } = req.body;
  // use req.params.id to refer to the correct habit. id should === habit_id (habit name)
  const statusQuery = 'UPDATE user_habits_join SET completed_today = $1'; 
  //########## need to fix this query: update user_habits_join where habit_id === req.params.id & user_id === req.cookies.email, set completed_today = $1
  // completed_today defaults to false
  try {
    const status = await db.query(statusQuery,[completedToday]).rows[0]['completed_today'];
    //client will click a status button which value is boolean;
    res.locals.habitStatus = status;
    return next();
  } catch (err) {
    return next({'err': err, message: 'query failed in userController.setOneHabitStatus'});
  }
};

userController.resetAllHabitStatus = async (req, res, next) => {
  const current =  new Date().toLocaleString();
  const currentDate = new Date().toLocaleDateString();
  let endOfDay = currentDate + ", " + "11:59:59 PM";
  const resetStatusQuery = 'UPDATE user_habits_join SET completed_today = false';
  if(current === endOfDay){
    await db.query(resetStatusQuery);
  }
  return next();
};

userController.getMyHabits = async (req, res, next) => {
  //in verifyUser, res.locals.user = {name: name, email: email}. 
  //const user=res.locals.user;
  //const getMyHabitsQuery = `SELECT * FROM users_habits_join WHERE users_id = ${user.email}`;
  const alan = 'alan@gmail.com';
  const getMyHabitsQuery = 'SELECT * FROM users_habits_join WHERE _id = 4 ' ;//only dor testing. should query WHERE users_id to verify user.
  try {
    const myHabits = await db.query(getMyHabitsQuery,[]);
    // console.log('myHabits >>>',myHabits);
    console.log('in getMyHabits');
    res.locals.myHabits = myHabits.rows;
    return next();
  } catch (err) {
    return next({'err': err, message: 'query failed in userController.getMyHabits'});
  }
};


userController.myTodayGoals = async (req, res, next) => {
 //in getMyHabits, res.locals.myHabits = myHabits.rows;
 console.log('in myTodayGoals');
 const myHabits = res.locals.myHabits;//[{1~12},{1~12}]
 const todayGoals = [];
 myHabits.forEach(obj=>{
   if(!obj.completed_today) todayGoals.push(obj.habits_id);
 }) // ########################### this is testing for the wrong thing. right now it's only returning today's goals that are not completed. we want to return all of today's goals. this will require a query to the database. 
  //retrieve list of habit names & completed_today values from user_habits_join corresponding to current users_id, that have a users_habits_join_id in the user_habit_calendar on the current day (How this query works: first find all entries in user_habit_calendar where days_since_launch = today. Also find all users_habits_join entries with users_id of current user. Then filter the list from user_habit_calendar further to only include entries with users_habits_join_id’s that occur on the list from users_habits_join. )


 res.locals.todayGoals = todayGoals;
 return next(); 
};

userController.checkProgress = async (req, res, next) => {
  // - for each entry in the res.locals.todayGoals, compare its days_missed value with its days_missed_until_reminder value. if they equal each other for any of the entries, redirect to GET /video
  // EXCEPT, we can't just redirect because we need habitsPageRouter get '/' to finish & return its list of today's habits... so how can we handle this?
  // can we open a new request from here without interrupting the current request?
  // or, do we send back a confirmation to the client that it's time to display video, upon recieving which the client makes a new get request to /video?
  next();
}

userController.makeFriendRequest = async (req, res, next) => {};

userController.acceptFriendRequest = async (req, res, next) => {};

userController.removeFriend = async (req, res, next) => {};


userController.changeDarkmodeSetting = async (req, res, next) => {};

userController.changePushNotificationSetting = async (req, res, next) => {};

userController.changeTextNotificationSetting = async (req, res, next) => {}; //stretch


module.exports = userController;

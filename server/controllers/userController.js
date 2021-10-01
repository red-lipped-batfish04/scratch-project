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
  const getHabitQuery = 'SELECT name FROM habits WHERE name = $1' //TODO: query string to check habits table for habitName
  try {
    const habitExists = await db.query(getHabitQuery, [habitName]).rows[0] === 'habitQuery'; //WHAT IS THE RETURNED DATA TYPE??
    if (!habitExists) {
      const setHabitQuery = 'INSERT INTO habits (name) VALUES $1';
      try {
        const habitNameAdded = await db.query(setHabitQuery, [habitName]);
        res.locals.habitNameAdded = habitNameAdded;
      } catch (setQueryError) {
        return next({'err': setQueryError, message: 'setHabit query failed in userController.addHabit'})
      }
    }
  } catch (getQueryError) {
    return next({'err': getQueryError, message: 'getHabit query failed in userController.addHabit'})
  }
  const userHabitJoinQuery = 'INSERT INTO users_habits_join VALUES $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12';
  try {
    db.query(userHabitJoinQuery, [])
    return next()
  } catch (setUserHabitJoinError) {
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
  const{ completeToday } = req.body;
  const statusQuery = 'UPDATE user_habits_join SET completed_today = $1'; //what is the default value? false/uncompleted?
      const status = await db.query(statusQuery,[completeToday]).rows[0];
  //client will click a status button which value is boolean;
  res.locals.habitStatus = status;
  return next();
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

//when frontend save video, use habit to name the video file.
//send the video name to backend to store the file in local.
// userController.saveVideo = async (req, res, next) => {
//   const {videoFile} = req.body;
//   const saveVideoQuery = 'INSERT INTO videos (filename) VALUES = $1';
//   const saveVideo = await db.query(saveVideoQuery,[videoFile]).rows[0];
//   // store all videos' path/name ['running','reading','coding]
//   const videoFolder = [];
//   //upload file to local
//   //need to confirm the uploaded video file path.
//   file.mv(`${__dirname}/public/uploads/${saveVideo}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//    });
//    videoFolder.push(saveVideo);
//   res.locals.videoFolder = videoFolder;
//   res.locals.video = saveVideo;
//   return next();
// };

userController.sendVideo = async (req, res, next) => {
  //need to confirm the file paths
  //const uploads = fs.readdirSync('./public/uploads')//return array
  
  


  // return res.json(uploads);
};

userController.getMyHabits = async (req, res, next) => {
  //in verifyUser, res.locals.user = {name: name, email: email}. 
  //const user=res.locals.user;
  //const getMyHabitsQuery = `SELECT * FROM users_habits_join WHERE users_id = ${user.email}`;
  const alan = 'alan@gmail.com';
  const getMyHabitsQuery = 'SELECT * FROM users_habits_join WHERE _id = 4 ' ;//only dor testing. should query WHERE users_id to verify user.
  const myHabits = await db.query(getMyHabitsQuery,[]);
  console.log('myHabits >>>',myHabits);
  res.locals.myHabits = myHabits.rows;
  return next();
};


userController.myTodayGoals = async (req, res, next) => {
 //in getMyHabits, res.locals.myHabits = myHabits.rows;
 const myHabits = res.locals.myHabits;//[{1~12},{1~12}]
 const todayGoals = [];
 myHabits.forEach(obj=>{
   if(!obj.completed_today) todayGoals.push(obj.habits_id);
 })

 res.locals.todayGoals = todayGoals;
 return next();

  
};

userController.deleteVideo = async (req, res, next) => {}; //stretch


userController.makeFriendRequest = async (req, res, next) => {};

userController.acceptFriendRequest = async (req, res, next) => {};

userController.removeFriend = async (req, res, next) => {};


userController.changeDarkmodeSetting = async (req, res, next) => {};

userController.changePushNotificationSetting = async (req, res, next) => {};

userController.changeTextNotificationSetting = async (req, res, next) => {}; //stretch


module.exports = userController;

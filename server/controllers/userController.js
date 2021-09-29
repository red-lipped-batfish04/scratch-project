const db = require('../models/usersDatabaseModels');
const bcrypt = require('bcrypt');


// ----- CONTROLLER FOR REGISTRATION AND USER LOGIN VERIFICATIONS ------
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
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING _id;`;
    const values = [ name, email, crypt_password, phoneNumber, time, true ];
    const addedUserID = await db.query(addUserQuery, values);
    
    // store user in res.locals
    res.locals.user = { name: name, email: email };
    res.locals._id = addedUserID.rows[0]._id;
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
    const findUserQuery = `SELECT password, _id, name
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
    const userID = returnedQuery.rows[0]._id;
    const verify = await bcrypt.compare(password, hashedPassword);
  
    // if verification is false, redirect to login page
    if (verify === false) {
      res.locals.registrationStatus = false;
      return next();
    }
  
    else {
      res.locals._id = userID;
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

module.exports = userController;
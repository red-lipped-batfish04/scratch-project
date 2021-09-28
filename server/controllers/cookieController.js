const jwt = require('jsonwebtoken');

// ----- CONTROLLER FOR COOKIES! ------
const cookieController = {};

// create session cookie
cookieController.createSession = async (req, res, next) => {
  try {
    const token = await jwt.sign({ id: res.locals._id }, process.env.SECRET_SALT);
    res.cookie('ssid', token, {maxAge: 300000});
    return next();
  } 
  catch (err) {
    return next(err);
  }
};

cookieController.verifyToken = async (req, res, next) => {
  try{
    const token = req.body.token;
    const id = await jwt.verify(token, process.env.SECRET_SALT);
    if (id) {
      res.locals.tokenVerify = true;
    }
    else res.locals.tokenVerify = false;
    return next();
  }
  catch (err) {return next(err);}
};

module.exports = cookieController;
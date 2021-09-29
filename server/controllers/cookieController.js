const jwt = require('jsonwebtoken');

// ----- CONTROLLER FOR COOKIES! ------
const cookieController = {};

// create session cookie
cookieController.createSession = async (req, res, next) => {
  try {
    if (res.locals.registrationStatus === false) {
      return next();
    }

    // process.env secrets are not working need to fix
    const token = await jwt.sign({ id: res.locals._id }, 'process.env.SECRET_SALT');
    res.cookie('ssid', token, {httpOnly: true});
    return next();
  } 
  catch (err) {
    return next(err);
  }
};

cookieController.verifyToken = async (req, res, next) => {
  try{
    const token = req.body.token;
    const verification = await jwt.verify(token, 'process.env.SECRET_SALT');
    if (verification) {
      res.locals.tokenVerification = true;
    }
    else res.locals.tokenVerification = false;
    return next();
  }
  catch (err) {return next(err);}
};

module.exports = cookieController;
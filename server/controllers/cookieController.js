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
    const token = await jwt.sign({ email: res.locals.user.email }, 'process.env.SECRET_SALT');
    res.cookie('ssid', token, {maxAge: 500000});
    req.app.locals.token = token;
    return next();
  } 
  catch (err) {
    return next(err);
  }
};

cookieController.verifyToken = async (req, res, next) => {
  console.log('in get /habits: verifyToken');
  try {
    //const token = req.app.locals.token;
    const token = req.cookies['ssid'];
    console.log(token)
    const verification = await jwt.verify(token, 'process.env.SECRET_SALT');
    if (verification) {
      res.locals.tokenVerification = true;
      res.locals.email = verification.email;
      console.log(res.locals.email)
      return next();
    } else {
      res.locals.tokenVerification = false;
      return next();
    }
  }
  catch (err) {return next(err);}
};

module.exports = cookieController;
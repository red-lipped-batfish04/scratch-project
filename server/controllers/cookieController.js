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
    console.log('in createsession, token is: ', token);
    res.cookie('ssid', token, {secure: false, httpOnly: true});
    return next();
  } 
  catch (err) {
    return next(err);
  }
};

cookieController.verifyToken = async (req, res, next) => {
  console.log('in get /habits: verifyToken');
  try {
    const token = req.cookies.ssid;
    console.log(token);
    console.log('req.headers.cookie: ', req.headers.cookie);
    console.log(req.cookies);
    const verification = await jwt.verify(token, 'process.env.SECRET_SALT');
    if (verification) {
      res.locals.tokenVerification = true;
      res.locals.email = verification.email;
    }
    else res.locals.tokenVerification = false;
    return next();
  }
  catch (err) {return next(err);}
};

module.exports = cookieController;
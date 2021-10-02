const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./models/usersDatabaseModels.js');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');

const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const habitsPageRouter = require('./routes/habitsPageRouter');
const videoRouter = require('./routes/videoRouter');
const friendsPageRouter = require('./routes/friendsPageRouter');
const dailyRouter = require('./routes/dailyRouter');

cron.schedule('59 59 23 * * *', () => {
  app.use('/daily', dailyRouter);
});

// allow api for parsing json
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(cookieParser());

// allow api to receive data from client app
// app.use(express.urlencoded());

// express rendering of static imgs, etc.
app.use(express.static(__dirname + "../public"));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/habits', habitsPageRouter);
app.use('/friends', friendsPageRouter);
//app.use('/addhabit',AddHabit);
// app.use('/video', videoRouter);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send('Internal Server Error');
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


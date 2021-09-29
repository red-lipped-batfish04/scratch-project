const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./models/usersDatabaseModels.js');

const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');

// allow api for parsing json
app.use(express.json());
app.use(cors());

// allow api to receive data from client app
// app.use(express.urlencoded());

// express rendering of static imgs, etc.
app.use(express.static(__dirname + "../public"));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send('Internal Server Error');
});


app.listen(3000); //listens on port 3000 -> http://localhost:3000/


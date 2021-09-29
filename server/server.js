const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + "../public"));


app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/index.html'));
});


// if (process.env.NODE_ENV !== 'development') {
  // statically serve everything in the build folder on the route '/build'
  // app.use('/', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  // app.get('/', (req, res) => {

// });
// }

app.listen(3000); //listens on port 3000 -> http://localhost:3000/


const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('../models/usersDatabaseModels.js');

// allow api for parsing json
app.use(express.json());
app.use(cors());

// allow api to receive data from client app
app.use(express.urlencoded());

// express rendering of static imgs, etc.
app.use(express.static(__dirname + "../public"));


app.get('/', (req, res) => {
  let getdata = db.query('SELECT name FROM users');
  console.log(getdata); 
  return res.status(200).send('in the server');
});

app.post('/register',(req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const password =req.body.password;
   
  db.query('INSERT INTO users(name,email,password) VALUES (?,?,?)', [name,email,password],(err,result)=>{
    console.log(err,result);//result from query
  } )

})

// app.post('/login',(req,res)=>{
  
//   //login only need to check email and password
//   const email = req.body.email;
//   const password =req.body.password;
   
 
//   db.query('SELECT * FROM users(email,password) WHERE email = ? AND password = ?)', [email,password],(err,result)=>{
//     if(err){
//       console.log(err+'in login server');
//       res.send(err);
//     };
    
//     //if(result.length > 0)
//     if(result){
//         res.send(result);//send the user to frontend
//     }else{
//         res.send({message:'Wrong user Email/Password combination'});
//     };
    
//   } )

// })




// if (process.env.NODE_ENV !== 'development') {
  // statically serve everything in the build folder on the route '/build'
  // app.use('/', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  // app.get('/', (req, res) => {

// });
// }

app.listen(3000); //listens on port 3000 -> http://localhost:3000/


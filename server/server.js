const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());//allow api for parsing json
app.use(cors());
app.use(express.urlencoded());//allow api to receive data from client app

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
// db.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM users", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });


app.use(express.static(__dirname + "../public"));




app.get('/', (req, res) => {
  //return res.sendFile(path.resolve(__dirname, '../public/index.html'));
  return res.status(200).send('in the server');
});

app.post('/register',(req,res)=>{
  //9/24 sql data is array or obj?
  const username = req.body.username;
  const email = req.body.email;
  const password =req.body.password;
   
  // ? refer to req.body
  db.query('INSERT INTO users(username,email,password) VALUES (?,?,?)', [username,email,password],(err,result)=>{
    console.log(err,result);//result from query
  } )

})

app.post('/login',(req,res)=>{
  
  //login only need to check email and password
  const email = req.body.email;
  const password =req.body.password;
   
 
  db.query('SELECT * FROM users(email,password) WHERE email = ? AND password = ?)', [email,password],(err,result)=>{
    if(err){
      console.log(err+'in login server');
      res.send(err);
    };
    
    //if(result.length > 0)
    if(result){
        res.send(result);//send the user to frontend
    }else{
        res.send({message:'Wrong user Email/Password combination'});
    };
    
  } )

})




// if (process.env.NODE_ENV !== 'development') {
  // statically serve everything in the build folder on the route '/build'
  // app.use('/', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  // app.get('/', (req, res) => {

// });
// }

app.listen(3000); //listens on port 3000 -> http://localhost:3000/


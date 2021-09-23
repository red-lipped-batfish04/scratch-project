import React, { Component,useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';//make routes
import LoginAndRegister from './LoginAndRegister';
import Axios from 'axios';


//const LoginAndRegister = () => <div>Register</div>;

const App = () => {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  // const [userNameReg,setUsernameReg]=useState('');
  // const [userPasswordReg,setUserPasswordReg]=useState('');

  const Home = () => <div>LoginAndRegister</div>;



  const login = () =>{
    Axios.post('http://localhost:8080/',{
      username:username,
      password:password
    }).then((res)=>{
      console.log(res)
    });
  }
  
  return (
    <main>
    <Router>
    
    <Link to="/register">Register</Link>
   
    <Route exact path="/register" component={LoginAndRegister} />
   
   </Router>

    <h1>Habit application</h1>
    {/* <a href='http://localhost:8080/register'>
        <button className='buttonLogin'>Login/Register</button>
    </a> */}
    
   

    {/* <div className="register">
      <h2>Registration</h2>
      <input type="text" placeholder="Your Name" ></input>
      <input type="text" placeholder="Your Email" ></input>
      <input type="password" placeholder="Your Password" ></input>
      <input type="password" name="reEnterPassword" placeholder="Re-enter Password" ></input>
      <button className="button" >Register</button>
    </div> */}
    <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Your Email" ></input>
      <input type="password" placeholder="Your Password" ></input>
      <button className="button" >Login</button>

    </div>
     
     
    
    </main>
  )

}

export default App;


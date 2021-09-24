import React, {useState } from 'react';

import Axios from 'axios';



const Login = () => {

  // const [username,setUsername]=useState('');
  // const [password,setPassword]=useState('');
  // const [userNameReg,setUsernameReg]=useState('');
  // const [userPasswordReg,setUserPasswordReg]=useState('');

  



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
    
   

    <h1>Habit application in Login.js</h1>
    
    
   

    
     <div className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Your Email" ></input>
      <input type="password" placeholder="Your Password" ></input>
      <button className="button" >Login</button>

    </div>
      
     
    
    </main>
  )

}

export default Login;
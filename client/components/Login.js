import React, {useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';



const Login = () => {

  const [loginEmail,setLoginEmail]=useState('');
  const [loginPassword,setLoginPassword]=useState('');

  const history = useHistory();
  

  const login = () =>{
    Axios.post('http://localhost:8080/',{
      email:email,
      password:password
    }).then((res)=>{
      console.log(res)//or res.data
      history.push("/habits"); // 9/24 should double check which page to be linked after logged 
    });
  }
  
  return (
    <main>
    
   

    <h1>Habit application in Login.js</h1>
    
    
   

    
     <div className="login">
      <h2>Login</h2>
      <input onChange={(e)=>{setLoginEmail(e.target.value)}} type="text" placeholder="Your Email" ></input>
      <input onChange={(e)=>{setLoginPassword(e.target.value)}} type="password" placeholder="Your Password" ></input>
      <button onClick={login} className="button" >Login</button>

    </div>
      
     
    
    </main>
  )

}

export default Login;
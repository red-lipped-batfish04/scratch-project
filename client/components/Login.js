import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
  
  const history = useHistory();

  // initial state for Login component
  const [state, setState] = useState({
    email: '',
    password: '',
    success: null,
  })

  // handle typed inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  // post request for logging in
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      "email" : state.email,
      "password" : state.password,
    }

    axios.post('http://localhost:3000/login', payload)
      .then((res) => {
        if (res.status === 200) {
          setState(prevState => ({
            ...prevState,
            'success' : 'Log in successful, redirecting to homepage...'
          }))
          // push to homepage
          history.push('/habits')
        }
        else if (res.status === 204) {
          res.send('Email and password do not match')
        }
        else {
          res.status(404).send('Email does not exist')
        }
    })
    .catch(error => {
      console.log(error)
    });
  }
  

  return (
    <div>
      <h1>Habit application in Login.js</h1>
      <div className="login">
        <h2>Login</h2>
        <form>
          <div className="emailInput">
            <input type='email' 
              id='email' 
              value={state.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="passwordInput">
          <input type='password' 
              id='password' 
              value={state.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
          <button onClick={handleSubmitClick} className="button" >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
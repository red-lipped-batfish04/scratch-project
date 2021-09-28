import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Register = (props) => {

  // declare initial state
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    success: null,
  })
    
  // typing change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value,
    }));
  };

  // history push pages
  const history = useHistory();

  // redirect to login page if already have an account
  const redirectToLogin = () => {
    history.push('/login')
  }

  // handle click on registration
  const handleSubmitClick = (e) => {
    if (state.password === state.confirmPassword && state.name && state.email) {
      const payload = {
        "name": state.name,
        "email": state.email,
        "password": state.password,
      }

      axios.post('http://localhost:3000/register', payload)
      .then(res => {
        if (res.status === 200) {
          setState(prevState => ({
            ...prevState,
            'success' : 'Registration successful, redirecting to homepage...'
          }));
          // push to homepage
          history.push('/habits')
        }
      })
      .catch(error => {
        console.log(error)
      });

    } else {
      res.send('Please enter valid name, email & password');
    }
  }

  return (
    <div>
      <h1>in React Register.js</h1>
        <form>
          <div className="register">
          <h2>Registration</h2>
            <div className="reg-name-input">
              <input type='name' 
                id='name' 
                value={state.name}
                  onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>
            <div className="reg-email-input">
              <input type='email' 
                id='email' 
                value={state.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            <div className="reg-password-input">
              <input type='password' 
                id='password' 
                value={state.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
              <div className="reg-confirm-password">
                <input type='password' 
                id='confirmPassword' 
                value={state.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              onClick={handleSubmitClick}>Register</button>
          </div>
          <div className="alert alert-success mt-2" style={{display: state.success ? 'block' : 'none' }} role="alert">
            {state.success}
          </div>
          <div className="got-login">
            <span>Already have an account?</span>
            <button className="login-button" onClick={() => redirectToLogin()}>Login here</button>
          </div>
        </form> 
    </div>
  )
};

export default Register;
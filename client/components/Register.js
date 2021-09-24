import React,{useState} from 'react';

const Register = ()=> {
    // const [userNameReg,setUsernameReg]=useState('');
    // const [userPasswordReg,setUserPasswordReg]=useState('');

    const register = () =>{
        Axios.post('http://localhost:8080/register',{
          username:username,
          password:password
        }).then((res)=>{
          console.log(res)
        });
      }

    return(
        <div>
            <h1>in React Register</h1>
            <div className="register">
              <h2>Registration</h2>
              <input type="text" placeholder="Your Name" ></input>
              <input type="text" placeholder="Your Email" ></input>
              <input type="password" placeholder="Your Password" ></input>
              <input type="password" name="reEnterPassword" placeholder="Re-enter Password" ></input>
              <button className="button" >Register</button>
        </div>
       
    </div>
    )
}

export default Register;
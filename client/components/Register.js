import React,{useState} from 'react';
import { useHistory } from "react-router-dom";

const Register = ()=> {
    const [ usernameReg, setUsernameReg ] = useState('');
    const [ emailReg, setEmailReg ] = useState('');
    const [ passwordReg, setPasswordReg ] = useState('');
    const [ reEnterPasswordReg, setReEnterPasswordReg ] = useState('');

    const history = useHistory();

    const register = () =>{
      // 9/24 check should use 8080 or 3000 port
      if( name && email && password && (password === reEnterPassword)){
        Axios.post('http://localhost:8080/register',{
          name:name,
          email:email,
          password:password,
          reEnterPassword:reEnterPassword
        }).then((res)=>{
          console.log(res)
          history.push("/login")
        });
      } else {
        alert("invalid input");
      }
    }

    return(
        <div>
            <h1>in React Register.js</h1>
            <div className="register">
              <h2>Registration</h2>
              <input onChange={(e)=>{setUsernameReg(e.target.value)}} type="text" placeholder="Your Name" ></input>
              <input onChange={(e)=>{setEmailReg(e.target.value)}} type="text" placeholder="Your Email" ></input>
              <input onChange={(e)=>{setPasswordReg(e.target.value)}} type="password" placeholder="Your Password" ></input>
              <input onChange={(e)=>{setReEnterPasswordReg(e.target.value)}} type="password" name="reEnterPassword" placeholder="Re-enter Password" ></input>
              <button onClick={register} className="button" >Register</button>
        </div>
       
    </div>
    )
}

export default Register;
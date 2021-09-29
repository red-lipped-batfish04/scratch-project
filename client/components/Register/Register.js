import React, { useState } from "react";
import {
	Box,
	Heading,
	LightMode,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Card } from "../Register/Card";
import { EmailRegisterForm } from "../Register/EmailRegisterForm";
import { GoogleRegisterButton } from "../Register/GoogleRegisterButton";
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
    e.preventDefault();
    if (state.password === state.confirmPassword && state.name && state.email) {
      const payload = {
        "name": state.name,
        "email": state.email,
        "password": state.password,
        "phoneNumber": state.phoneNumber,
      };

      axios.post('http://localhost:3000/register', payload)
      .then(res => {
        if (res.status === 200) {
          setState(prevState => ({
            ...prevState,
            'success' : 'Registration successful, redirecting to homepage...'
          }));
          // push to homepage
          history.push('/habits')
        } else {
          console.log('I like turtles.')
        }
      })
      .catch(error => {
        console.log(error)
      });
    } 
    
    else {
      res.send('Please enter valid name, email & password');
    }
  }

  return (
		<>
			{/*/  start new styled components here for registration page */}
			<Box
				as="section"
				bgGradient={{
					md: "linear(to-r, blue.600, green.200)",
				}}
				py="20"
			>
				<Card maxW="2xl" mx="auto" textAlign="center">
					<Stack maxW="xs" mx="auto" spacing="8">
						<Stack spacing="3">
							<Heading as="h1" letterSpacing="tight">
								Sign up!
							</Heading>
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								"The task of breaking a bad habit is like uprooting a powerful
								oak within us."
							</Text>
						</Stack>

						<LightMode>
							<GoogleRegisterButton />
						</LightMode>
						<EmailRegisterForm onSubmit={(e) => e.preventDefault()} />

						<Box fontSize="sm">
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								Already have an account?
							</Text>
							<Link
								fontWeight="semibold"
								color={useColorModeValue("blue.600", "blue.300")}
								href='/login'
							>
								Login
							</Link>
						</Box>
					</Stack>
					<Text
						mt="16"
						fontSize="xs"
						mx="auto"
						maxW="md"
						color={useColorModeValue("gray.600", "gray.400")}
					>
						By logging in, you acknowledge that you have read, understood, and
						agree to our terms and conditions.
					</Text>
				</Card>
			</Box>

			{/* // end new component */}

			<div>
				<h1>in React Register.js</h1>
				<form>
					<div className="register">
						<h2>Registration</h2>
						<div className="reg-name-input">
							<input
								type="name"
								id="name"
								value={state.name}
								onChange={handleChange}
								placeholder="Enter Name"
							/>
						</div>
						<div className="reg-email-input">
							<input
								type="email"
								id="email"
								value={state.email}
								onChange={handleChange}
								placeholder="Enter Email"
							/>
						</div>
						<div className="reg-password-input">
							<input
								type="password"
								id="password"
								value={state.password}
								onChange={handleChange}
								placeholder="Enter Password"
							/>
						</div>
						<div className="reg-confirm-password">
							<input
								type="password"
								id="confirmPassword"
								value={state.confirmPassword}
								onChange={handleChange}
								placeholder="Confirm Password"
							/>
						</div>
						<div className="reg-phone-input">
							<input
								type="phoneNumber"
								id="phoneNumber"
								value={state.phoneNumber}
								onChange={handleChange}
								placeholder="Enter Phone Number for Text Notifications"
							/>
						</div>
						<button
							type="submit"
							className="btn-primary"
							onClick={handleSubmitClick}
						>
							Register
						</button>
					</div>
					<div
						className="alert alert-success mt-2"
						style={{ display: state.success ? "block" : "none" }}
						role="alert"
					>
						{state.success}
					</div>
					<div className="got-login">
						<span>Already have an account?</span>
						<button className="login-button" onClick={() => redirectToLogin()}>
							Login here
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Register;
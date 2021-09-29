import React, { useState } from 'react';
import {
	Box,
	Heading,
	LightMode,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Card } from "../Login/Card";
import { EmailLoginForm } from "../Login/EmailLoginForm";
import { GoogleLoginButton } from "../Login/GoogleLoginButton";
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
		<>
			{/* // start new component */}
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
								Login
							</Heading>
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								"The seed of every habit is a single, tiny decision."
							</Text>
						</Stack>

						<LightMode>
							<GoogleLoginButton />
						</LightMode>
						<EmailLoginForm onSubmit={(e) => e.preventDefault()} />

						<Box fontSize="sm">
							<Text
								fontWeight="medium"
								color={useColorModeValue("gray.600", "gray.400")}
							>
								Don't have an account yet?
							</Text>
							<Link
								fontWeight="semibold"
								color={useColorModeValue("blue.600", "blue.300")}
							>
								Sign up
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
				<h1>Habit application in Login.js</h1>
				<div className="login">
					<h2>Login</h2>
					<form>
						<div className="emailInput">
							<input
								type="email"
								id="email"
								value={state.email}
								onChange={handleChange}
								placeholder="Enter Email"
							/>
						</div>
						<div className="passwordInput">
							<input
								type="password"
								id="password"
								value={state.password}
								onChange={handleChange}
								placeholder="Enter Password"
							/>
						</div>
						<button onClick={handleSubmitClick} className="button">
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
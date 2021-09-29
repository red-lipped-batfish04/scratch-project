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

const Login = (props) => {
  
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
								href='/register'
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
			{/* <div>
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
			</div> */}
		</>
	);
}

export default Login;
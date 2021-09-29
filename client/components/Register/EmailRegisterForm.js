import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import React, { useState } from "react";

export const EmailRegisterForm = (props) => {
	function PasswordInput() {
		const [show, setShow] = useState(false);
		const handleClick = () => setShow(!show);
	}

	return (
		<chakra.form width="full" {...props}>
			<FormControl>
				<FormLabel
					fontWeight="medium"
					fontSize="sm"
					mb="2"
					textAlign="center"
					color={useColorModeValue("gray.600", "gray.400")}
				>
					or sign up with email
				</FormLabel>
				<Input
					type="email"
					placeholder="Email address"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
				/>
				<Input
					mt={2}
					type="password"
					placeholder="Password"
					_placeholder={{
						color: useColorModeValue("gray.600", "gray.400"),
					}}
				/>
			</FormControl>
			<Button
				mt="3"
				isFullWidth
				fontSize="sm"
				fontWeight="bold"
				colorScheme="gray"
				onClick={console.log("I'M LOGGING IN!")}
			>
				Login
			</Button>
		</chakra.form>
	);
};

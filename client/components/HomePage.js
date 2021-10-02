import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Flex,
	Button,
	Heading,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { SunIcon } from "@chakra-ui/icons";

const HomePage = () => {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100");

	// delete this when auth is completed and redirects to the appropiate route
	// I just created this so that we can easily get to the habit dashboard until auth is done
	const history = useHistory();
	const loginRedirect = () => {
		history.push("/login");
	};

	return (
		<Flex
			background={formBackground}
			height="100vh"
			alignItems="center"
			justifyContent="center"
		>
			<main>
				<Heading fontSize="4em" color="blue.400">
					Habit Tribes
				</Heading>
				<Button
					rightIcon={<FcGoogle />}
					backgroundColor="gray.600"
					color="white"
					fontWeight="medium"
					mt={2}
					_hover={{ bg: "gray.400" }}
					_active={{
						bg: "gray.800",
						transform: "scale(0.95)",
					}}
					onClick={loginRedirect}
				>
					Login
				</Button>
				<div></div>
				<Button
					rightIcon={<SunIcon />}
					backgroundColor="gray.600"
					color="white"
					fontWeight="medium"
					mt={2}
					_hover={{ bg: "gray.400" }}
					_active={{
						bg: "gray.800",
						transform: "scale(0.95)",
					}}
					onClick={toggleColorMode}
				>
					Color Mode
				</Button>
			</main>
		</Flex>
	);
};

export default HomePage;

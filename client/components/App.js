import React, { Component } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { 
	Flex,
	Button,
	Heading,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc'
import { SunIcon } from '@chakra-ui/icons'

const App = () => {

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.900');
  
  return (
		<ChakraProvider>
			<Flex
				background={formBackground}
				height="100vh"
				alignItems="center"
				justifyContent="center"
			>
				<main>
          <Heading
            fontSize="4em"
            color="blue.400"
          >Habit Tribes</Heading>
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
            onClick={console.log('login')}
          >Login with Google</Button>
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
		</ChakraProvider>
	);

}

export default App;

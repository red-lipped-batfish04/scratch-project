import React from "react";
import {
	Box,
	Button,
	Flex,
	Avatar,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/React";

const navBar = ({ children }) => {
	const { toggleColorMode } = useColorMode();
	const formBackGround = useColorModeValue("gray.100");

	return (
		<Box backgroundColor="gray.100" h="100vh">
			<Flex
				backgroundColor="white"
				mb={[8, 16]}
				w="full"
				borderTop="5px solid #A9A9A9	"
			>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					pt={4}
					pb={4}
					maxW="1250px"
					margin="0 auto"
					w="full"
					px={8}
					h="60px"
				>
					<Flex align="center">
							<Link mr={4}>Rankings</Link>
												<Link>Settings</Link>
					</Flex>

					<Flex justifyContent="center" alignItems="center">
							<Link>
								<Avatar size="sm" src={user?.photoUrl} />
							</Link>
						<Button
							ml={2}
							mb={2}
							onClick={console.log('sign out')}
							backgroundColor="gray.900"
							color="white"
							fontWeight="medium"
							mt={2}
							mr={2}
							_hover={{ bg: "gray.700" }}
							_active={{
								bg: "gray.800",
								transform: "scale(0.95)",
							}}
						>
							Sign Out
						</Button>
						<Button
							backgroundColor="gray.900"
							color="white"
							onClick={toggleColorMode}
						>
							Color Mode
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
				{children}
			</Flex>
		</Box>
	);
};

export default navBar;

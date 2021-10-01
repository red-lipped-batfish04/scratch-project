import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import HabitList from './HabitList/HabitList'


export const PageContent = (props) => (
	<Box as="main" py="8" flex="1" {...props}>
		<Container maxW="7xl">
			<Box
				bg={useColorModeValue("white", "gray.700")}
				p="6"
				rounded="lg"
				shadow="base"
			>
				<HabitList />
				
			</Box>
		</Container>
	</Box>
);

import { Box, Stack, useColorModeValue, } from "@chakra-ui/react";
import * as React from "react";
import { InputCard } from "./InputCard";


export const AddHabits = () => (
	<Box
		bg={useColorModeValue("gray.50", "gray.800")}
		px={{
			base: "4",
			md: "10",
		}}
		rounded="lg"
		py="16"
	>
	
				<InputCard />
	</Box>
);

export default AddHabits
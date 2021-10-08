import { Box, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import AddHabitsButton from "./AddHabitsButton";
import StatsButton from "./StatsButton";
import SettingsButton from "./SettingsButton";


export const ActionsCard = (props) => (
	<Box
		bg={useColorModeValue("white", "gray.700")}
		shadow="base"
		rounded="lg"
		p={{
			base: "4",
			md: "8",
		}}
		{...props}
	>
		<Center>
			<SettingsButton />
			<AddHabitsButton />
			<StatsButton />
		</Center>
	</Box>
);

export default ActionsCard;
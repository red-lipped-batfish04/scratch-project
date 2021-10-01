import { Box, Flex, HStack } from "@chakra-ui/react";
import * as React from "react";
import {
	FaPeopleCarry,
	FaTasks,
	FaChartLine,
	FaUserFriends,
} from "react-icons/fa";
import { NavItem } from "./NavItem";

const MobileNavMenu = (props) => {
	const { isOpen } = props;
	return (
		<Flex
			hidden={!isOpen}
			as="nav"
			direction="column"
			bg="blue.400"
			position="fixed"
			height="calc(100vh - 4rem)"
			top="16"
			insetX="0"
			zIndex={10}
			w="full"
		>
			<Box px="4">
				<NavItem.Mobile active label="Goal Board" />
				<NavItem.Mobile label="Friends" /> 
				<NavItem.Mobile label="Tribes" />
				<NavItem.Mobile label="Results" />
			</Box>
		</Flex>
	);
};

const DesktopNavMenu = () => (
	<HStack
		spacing="3"
		flex="1"
		display={{
			base: "none",
			lg: "flex",
		}}
	>
		<NavItem.Desktop active icon={<FaTasks />} label="Goal Board" />
		<NavItem.Desktop icon={<FaUserFriends />} label="Friends" />
		<NavItem.Desktop icon={<FaPeopleCarry />} label="Tribes" />
		<NavItem.Desktop icon={<FaChartLine />} label="Results" />
	</HStack>
);

export const NavMenu = {
	Mobile: MobileNavMenu,
	Desktop: DesktopNavMenu,
};

import {
	Avatar,
	Box,
	Flex,
	HStack,
	Menu,
	MenuItem,
	MenuList,
	Text,
	useMenuButton,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

const UserAvatar = () => (
	<Avatar
		size="sm"
		src="https://uploads-ssl.webflow.com/60ef78253620692c7cbbc3dd/612fea34549e2609120d3a4f_Travis%20-%20circle%20-%20transparent.png"
		name="Travis Lockett"
	/>
);

const ProfileMenuButton = (props) => {
	const buttonProps = useMenuButton(props);
	return (
		<Flex
			{...buttonProps}
			as="button"
			flexShrink={0}
			rounded="full"
			outline="0"
			_focus={{
				shadow: "outline",
			}}
		>
			<Box srOnly>Open user menu</Box>
			<UserAvatar />
		</Flex>
	);
};

export const ProfileDropdown = () => (
	<Menu>
		<ProfileMenuButton />
		<MenuList
			rounded="md"
			shadow="lg"
			py="1"
			color={mode("gray.600", "inherit")}
			fontSize="sm"
		>
			<HStack px="3" py="4">
				<UserAvatar />
				<Box lineHeight="1">
					<Text fontWeight="semibold">Travis Lockett</Text>
					<Text mt="1" fontSize="xs" color="gray.500">
						travislockett1@gmail.com
					</Text>
				</Box>
			</HStack>
			<MenuItem fontWeight="medium">Account Settings</MenuItem>
			<MenuItem fontWeight="medium" color={mode("red.500", "red.300")} onClick={() => {
				localStorage.clear();
				window.location = '/'
			}}>
				Sign out
			</MenuItem>
		</MenuList>
	</Menu>
);

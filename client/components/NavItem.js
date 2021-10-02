import { Box, HStack } from "@chakra-ui/react";
import * as React from "react";
import { useHistory } from "react-router";

const handleClick = (history, label) => {
  let pathname = label.toLowerCase();
  if (pathname.includes('goal')) pathname = 'habits'; // this is messy. change to switch statement
  history.push({
    pathname: `/${pathname}`
  })
}


const DesktopNavItem = (props) => {
  const history = useHistory();
	const { icon, label, href = "#", active } = props;
	return (
		<HStack
			as="a"
			href={href}
			aria-current={active ? "page" : undefined}
			spacing="2"
			px="3"
			py="2"
			rounded="md"
			transition="all 0.2s"
			color="gray.200"
			_hover={{
				bg: "whiteAlpha.200",
			}}
			_activeLink={{
				bg: "blackAlpha.300",
				color: "white",
			}}
		>
			{icon && (
				<Box aria-hidden fontSize="md">
					{icon}
				</Box>
			)}
			<Box onClick={() => {handleClick(history, props.label)}} fontWeight="semibold">{label}</Box>
		</HStack>
	);
};

const MobileNavItem = (props) => {
  const history = useHistory();
	const { label, href = "#", active } = props;
	return (
		<Box onClick={() => {handleClick(history, props.label)}}
			as="a"
			display="block"
			href={href}
			px="3"
			py="3"
			rounded="md"
			fontWeight="semibold"
			aria-current={active ? "page" : undefined}
			_hover={{
				bg: "whiteAlpha.200",
			}}
			_activeLink={{
				bg: "blackAlpha.300",
				color: "white",
			}}
		>
			{label}
		</Box>
	);
};

export const NavItem = {
	Desktop: DesktopNavItem,
	Mobile: MobileNavItem,
};

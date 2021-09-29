import { Button } from "@chakra-ui/react";
import * as React from "react";
import { FaGoogle } from "react-icons/fa";

export const GoogleRegisterButton = (props) => (
	<Button
		fontSize="sm"
		fontWeight="bold"
		size="lg"
		leftIcon={<FaGoogle fontSize="18px" />}
		iconSpacing="3"
		colorScheme="blue"
		width="full"
		{...props}
	>
		Sign up with Google{" "}
	</Button>
);

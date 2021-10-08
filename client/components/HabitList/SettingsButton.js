import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FaRegSun } from "react-icons/fa";

export const SettingsButton = (props) => (
	<IconButton aria-label="Habit" icon={<FaRegSun />} />
);

export default SettingsButton;

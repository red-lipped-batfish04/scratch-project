import { IconButton } from "@chakra-ui/react";
import React from 'react';
import { FaPlus } from "react-icons/fa";


export const AddHabitsButton = (props) => (
	<>
		<IconButton
			aria-label="Add new habit"
			icon={<FaPlus />} />
	</>
);

export default AddHabitsButton;



import {
	Button,
	FormControl,
	FormLabel,
	Select,
	Switch,
	Stack,
	Input
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import { FieldGroup } from "./FieldGroup";
import { ModalPop } from "./ModalPop";
import { chakra, useColorModeValue } from "@chakra-ui/system";




export const InputCard = (props) => (
	<Stack as="section" spacing="6" {...props}>
		<Card>
			<Input
				mt={2}
				id="Goal"
				placeholder="Name of Goal"
				_placeholder={{
					color: useColorModeValue("gray.600", "gray.400"),
				}}
			/>
			<Input
				mt={2}
				id="DaysUntilReminder"
				placeholder="Days Until Reminder"
				_placeholder={{
					color: useColorModeValue("gray.600", "gray.400"),
				}}
			/>
			<FormControl id="frequency" mt={2}>
				<Select size="md">
					<option>Daily</option>
					<option>Every other day</option>
					<option>Weekly</option>
					<option>Monthly</option>
				</Select>
			</FormControl>
			<FormControl display="flex" alignItems="center" mt={"4"}>
				<FormLabel flex="1" fontSize="md" mb="0">
					Make this Goal Private
				</FormLabel>
				<Switch id="email-news" />
			</FormControl>
			<Button
				mt="5"
				size="sm"
				fontWeight="normal"
				isFullWidth
				fontSize="lg"
				fontWeight="bold"
				colorScheme="blue"
			>
				Record your WHY
			</Button>
				<ModalPop />
		</Card>
	</Stack>
);

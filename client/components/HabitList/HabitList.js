import { Box, Stack, Flex } from "@chakra-ui/react";
import * as React from "react";
import { DraggableListItem } from "./DraggableListItem";
import { useDraggableList } from "./useDraggableList";


export const HabitList = () => {
  // all of the elements in this array must be unqiue or it causes an issue on rendering that creates extra list items
  const initialItems = ["blue.200", "green.200", "blue.400", "green.400", "blue.500"];
	const { items, handlePositionUpdate, measurePosition } = useDraggableList(
		initialItems
	);
	return (
		<Box as="section">
			<Box maxWidth='600px' mx="auto">
				<Stack as="ul" spacing="4">
					{items.map((done, index) => (
						<DraggableListItem
							key={done}
							index={index}
							whileHover={{
								scale: 1.03,
							}}
							whileTap={{
								cursor: "grabbing",
								scale: 1.12,
							}}
							height="16"
							bg={done}
							borderRadius="lg"
							boxShadow="md"
							position="relative"
							onPositionUpdate={handlePositionUpdate}
              measurePosition={measurePosition}
            ><Flex
                mt={1}
                justifyContent="center"
                fontWeight="extrabold"
                fontSize="xl"
              >Practice algorithms for 30 minutes.
              </Flex>
            </DraggableListItem>
					))}
				</Stack>
			</Box>
		</Box>
	);
}

export default HabitList;
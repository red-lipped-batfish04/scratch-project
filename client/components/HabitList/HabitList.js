import { Box, Stack, Flex } from "@chakra-ui/react";
//import * as React from "react";
import { DraggableListItem } from "./DraggableListItem";
import { useDraggableList } from "./useDraggableList";
import AddHabits from "../AddHabitModal/AddHabits";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export const HabitList = () => {
	// all of the elements in this array must be unqiue or it causes an issue on rendering that creates extra list items
	const initialItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	const [todayGoals, setTodayGoals] = useState([""]);

	const { items, handlePositionUpdate, measurePosition } = useDraggableList(
		initialItems
	);

	useDraggableList(todayGoals);

	useEffect(() => {
		console.log("HabitList: in useEffect");

		axios.get('/api/habits')
		.then(res => {
			const todayGoalsFolder = [];
				res.data.forEach((obj) => {
					//if(!obj.completed_today)
					todayGoalsFolder.push(obj.habits_id);
				});

				setTodayGoals(todayGoalsFolder);
		});

		/*fetch("http://localhost:3000/habits", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => response.json()) //[{name:aa},{name:bb}]
			.then((result) => {
				const todayGoalsFolder = [];
				result.forEach((obj) => {
					//if(!obj.completed_today)
					todayGoalsFolder.push(obj.habits_id);
				});

				setTodayGoals(todayGoalsFolder);
			});*/
	}, [""]);

	console.log("todayGoals", todayGoals);

	const renderGoals = (goalsArr) => {
		let goal;
		let i = -1;
		return items.map((goal) => {
			goal = goalsArr[i];
			console.log("goal", goal);
			i++;

			return (
				<Box as="section">
					<Box maxWidth="600px" mx="auto">
						<Stack as="ul" spacing="4">
							<DraggableListItem
								key={goal}
								index={i}
								whileHover={{
									scale: 1.03,
								}}
								whileTap={{
									cursor: "grabbing",
									scale: 1.12,
								}}
								height="16"
								mt={4}
								bg={"blue.300"}
								borderRadius="lg"
								boxShadow="md"
								position="relative"
								onPositionUpdate={handlePositionUpdate}
								measurePosition={measurePosition}
							>
								<Flex
									mt={3}
									justifyContent="center"
									fontWeight="extrabold"
									fontSize="xl"
								>
									{" "}
									{todayGoals[i]}
								</Flex>
							</DraggableListItem>
						</Stack>
					</Box>
				</Box>
			);
		});
	};

	return (
		<>
			{/* <Box as="section">
			<Box maxWidth='600px' mx="auto">
				<Stack as="ul" spacing="4">
				
					{todayGoals.map((done, index) => (
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
              >Practice algorithms for 50 minutes. {todayGoals[0]}
              </Flex>
            </DraggableListItem>
			
					))}
				</Stack>
			</Box>
			<h1>{todayGoals}</h1>
			
		</Box> */}
			{renderGoals(todayGoals)}
			<div></div>
			<flex></flex>
			<AddHabits />
		</>
	);
};

export default HabitList;

/************* NEW CODE ********** */

// export const HabitList = () => {
// 	const initialItems = ["200", "300", "400", "500", "600"];
// 	const { items, handlePositionUpdate, measurePosition } = useDraggableList(
// 		initialItems
// 	);

// 	useEffect(() => {
// 		fetch("http://localhost:3000/habits", {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Accept: "application/json",
// 			},
// 		})
// 			.then((response) => response.json())
// 			.then((result) => {
// 				console.log("result from backend", result);
// 				const todayGoalsFolder = [];
// 				result.forEach((obj) => {
// 					todayGoalsFolder.push(obj.habits_id);
// 				});
// 				console.log("folder in useEffect >>", todayGoalsFolder);
// 				setTodayGoals(todayGoalsFolder);
// 			});
// 	}, []);

// 	return (
// 		<Box as="section" p="10">
// 			<Box maxWidth="600px" mx="auto">
// 				<Stack as="ul" spacing="4">
// 					{items.map((hue, index) => (
// 						<DraggableListItem
// 							key={hue}
// 							index={index}
// 							whileHover={{
// 								scale: 1.03,
// 							}}
// 							whileTap={{
// 								cursor: "grabbing",
// 								scale: 1.12,
// 							}}
// 							height="16"
// 							bg={`gray.${hue}`}
// 							borderRadius="lg"
// 							boxShadow="md"
// 							position="relative"
// 							onPositionUpdate={handlePositionUpdate}
// 							measurePosition={measurePosition}
// 						/>
// 					))}
// 					<AddHabits />
// 				</Stack>
// 			</Box>
// 		</Box>
// 	);
// };

// export default HabitList;

import { Box, Stack, Flex } from "@chakra-ui/react";
//import * as React from "react";
import { DraggableListItem } from "./DraggableListItem";
import { useDraggableList } from "./useDraggableList";
import React, { useEffect, useState } from 'react';


export const HabitList = () => {
  // all of the elements in this array must be unqiue or it causes an issue on rendering that creates extra list items
  const initialItems = ["blue.200", "green.200", "blue.400", "green.400", "blue.500"];
  const [todayGoals, setTodayGoals] = useState([' one more']);
    
   
	const { items, handlePositionUpdate, measurePosition } = useDraggableList(
		initialItems
	);
	
	useDraggableList(todayGoals)
  

	useEffect(() => {
        console.log('in useEffect');
        fetch('http://localhost:3000/habits',{headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
           })
          .then(response => response.json()) //[{name:aa},{name:bb}]
          .then(result => {
             console.log('result from backend',result);
             const todayGoalsFolder = ['test1 ','test2'];
             console.log('folder in useEffect >>',todayGoalsFolder);
            result.forEach(obj=>{
				 //if(!obj.completed_today)
                todayGoalsFolder.push(obj.habits_id);
            })
            
            console.log('folder in useEffect >>',todayGoalsFolder);
    
            setTodayGoals(todayGoalsFolder);
            
          });
      },['test1']);
	    
	  console.log('todayGoals',todayGoals);

      const renderGoals = (goalsArr)=>{
		  let goal;
		  let i = -1;
		return items.map(goal=>{
			goal=goalsArr[i] 
           console.log('goal',goal)
           i++
		   

		return(
			<Box as="section">
			<Box maxWidth='600px' mx="auto">
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
							bg={goal}
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
              > {todayGoals[i]}
			  
              </Flex>
            </DraggableListItem>
			
		</Stack>
			</Box>
			</Box>
			
			
		

		)}
		)}
						
						



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
		</>
	);
}

export default HabitList;
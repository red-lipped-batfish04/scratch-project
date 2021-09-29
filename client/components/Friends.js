import React, { useEffect, useState } from 'react';
import { ChakraProvider} from "@chakra-ui/react";
import { Box,Badge,Avatar,Button } from "@chakra-ui/react";

const AllUsers = () => {

    const [allUsers,setAllUsers] = useState([]);

    const testUser = ['a','b'];// in renderUsers should use allUsers as argument;

    //get all users from server and update allUsers arr;
    useEffect(() => {
        console.log('in useEffect');
        fetch('/friends')
          .then(response => response.json())
          .then(result => {
            const folder = result;
            
            console.log('folder in useEffect >>',folder);
    
            setAllUsers(folder);
            
          });
      },[]);

    

    const property = {
        
        name: "Eric Mulhern",
        NumOfHabits:4,
        AvgCompleted:'89%',
       
      }

      const renderUsers = (users) =>{
        

        return users.map((user)=>{
            

            return (
           
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
         
                <Box p="6">
                   
                   <Box
                     mt="1"
                     fontWeight="semibold"
                     as="h4"
                     lineHeight="tight"
                     isTruncated
                   > <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />{property.name}
                     
                   </Box>
                   <Box
                       color="gray.500"
                       fontWeight="semibold"
                       letterSpacing="wide"
                       fontSize="s"
                       textTransform="uppercase"
                       ml="2"
                     >
                      Num of Habits: {property.NumOfHabits}  
                      
                     </Box>
                     <Box
                       color="gray.500"
                       fontWeight="semibold"
                       letterSpacing="wide"
                       fontSize="s"
                       textTransform="uppercase"
                       ml="2"
                     >
                      Avg % completed: {property.AvgCompleted}  
                      
                     </Box>
       
                   
                   <br/>
                   <Button colorScheme="teal" size="sm">
                     Add Friend
                   </Button>
           
                 
                 </Box>
               </Box>
            
            )
           
        })

    }
    
      return (
          
        
       <div>
        {renderUsers(testUser)}
        </div>
        
       
      
       
      )

};

export default AllUsers;
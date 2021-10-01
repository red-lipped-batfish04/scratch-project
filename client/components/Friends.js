import React, { useEffect, useState } from 'react';
import { ChakraProvider} from "@chakra-ui/react";
import { Box,Avatar,Button } from "@chakra-ui/react";


const AllUsers = (props) => { 

    const [allUsers,setAllUsers] = useState([]);

    

    //get all users from server and update allUsers arr;
    useEffect(() => {
        console.log('in useEffect');
        fetch('http://localhost:3000/friends',{headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
           })
          .then(response => response.json()) //[{name:aa},{name:bb}]
          .then(result => {
           
            const folder = [];
            console.log('folder in useEffect >>',folder);
            result.forEach(obj=>{
                folder.push(obj.name);
            })
            
            console.log('folder in useEffect >>',folder);
    
            setAllUsers(folder);
            
          });
      },[]);



    const property = {
        
        NumOfHabits:4,
        AvgCompleted:'89%',
       
      }
      
      const renderUsers = (users) =>{
           let name;
           let i=0;
           //each loop change the users index to get every user 
        return users.map((user)=>{
           name=users[i] 
           console.log('name',name)
           i++
           
            return (
           
                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
         
                <Box p="6">
                   
                   <Box
                     mt="1"
                     fontWeight="semibold"
                     as="h4"
                     lineHeight="tight"
                     isTruncated
                   > <Avatar size="2xl" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />{name}
                     
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
       
       
        {renderUsers(allUsers)}
       </div>
        
       
      
       
       
      
    
      )

};

export default AllUsers;
import React, { useEffect, useState } from 'react';
import { ChakraProvider} from "@chakra-ui/react";
import { Box,Avatar,Button } from "@chakra-ui/react";
import axios from 'axios';


const AllUsers = (props) => { 

    const [allUsers,setAllUsers] = useState([]);
    const [userEmails,setUserEmails]=useState([]);

    

    const addFriend = (e) => {
      
      const id = e.target.id;  
  
  console.log("id before fetch",id);
  fetch(`http://localhost:3000/friends/:id`,{method:'POST'},id)
  
  .then(response => response.json())
  .then(result => {
    console.log(result)
    
  });
  
  };
    

    //get all users from server and update allUsers arr;
    useEffect(() => {
        console.log('in useEffect');
        fetch('http://localhost:3000/friends',{headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
           })
          .then(response => response.json()) //[{name:aa email:1@gmail.com},{name:bb}]
          .then(result => {
            const userEmail =[];
            const folder = [];
            console.log('folder in useEffect >>',folder);
            console.log('userEmail in useEffect >>',userEmail);
            result.forEach(obj=>{
                console.log('obj in forEach',obj)
                
                folder.push(obj.name);
                userEmail.push(obj.email);
                
            })
            
            console.log('folder in useEffect >>',folder);
    
            setAllUsers(folder);
            setUserEmails(userEmail);
          });
      },[]);



    const property = {
        
        NumOfHabits:4,
        AvgCompleted:'89%',
       
      }
      
      const renderUsers = (users) =>{
           let name;
           let email;
           let i=0;

           //each loop change the users index to get every user 
        return users.map((user)=>{
           name=users[i];
           email=userEmails[i];//match each addFriend btn id;
           console.log('name',name);
           console.log('email',email);
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
                   <Button id={email} onClick={addFriend} colorScheme="teal" size="sm">
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
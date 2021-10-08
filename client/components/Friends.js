import React, { useEffect, useState } from 'react';
import { Flex, HStack, useColorModeValue as mode } from "@chakra-ui/react";
import { MobileHamburgerMenu } from "./MobileHamburgerMenu";
import { Notification } from "./Notification";
import { PageContent } from "./PageContent";
import { PageHeader } from "./PageHeader";
import { ChakraProvider} from "@chakra-ui/react";
import { Box,Badge,Avatar,Button } from "@chakra-ui/react";
import { NavMenu } from "./NavMenu";
import { useMobileMenuState } from "./useMobileMenuState";
import axios from 'axios';

const AllUsers = (props) => { 
	const { isMenuOpen, toggle } = useMobileMenuState();

  const [allUsers,setAllUsers] = useState([]);

    

    //get all users from server and update allUsers arr;
    useEffect(() => {
        console.log('FRIENDS: in useEffect');

        axios.get('/api/friends')
        .then(res => {
          console.log('res', res);
          const folder = [];
            console.log('folder in useEffect >>',folder);
            res.data.forEach(obj=>{
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
        <Flex direction="column" bg={mode("gray.100", "gray.800")} height="100vh">
        <Flex align="center" bg="blue.400" color="white" px="6" minH="16">
          <Flex justify="space-between" align="center" w="full">
            <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
            <NavMenu.Mobile isOpen={isMenuOpen} />
  
            {/* Desktop Logo placement */}
            {/* <Logo
              display={{
                base: "none",
                lg: "block",
              }}
              flexShrink={0}
              h="5"
              marginEnd="10"
            /> */}
  
            {/* Desktop Navigation Menu */}
            <NavMenu.Desktop />
  
            {/* Mobile Logo placement */}
            {/* <Logo
              flex={{
                base: "1",
                lg: "0",
              }}
              display={{
                lg: "none",
              }}
              flexShrink={0}
              h="5"
            /> */}
  
          </Flex>
        </Flex>
  
        <PageHeader />
        <div>
          
          {renderUsers(allUsers)}
        </div>
      </Flex>
        
       
        
       
      
       
      )

};

export default AllUsers;
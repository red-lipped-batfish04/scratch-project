import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from './components/HomePage'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import HabitDashboard from './components/HabitDashboard';
import Friends from './components/Friends';



const App = () => {

  return (
		<ChakraProvider>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/habits" exact>
					<HabitDashboard />
				</Route>
				{/* <Route path="/addhabit">
					<AddHabit />
				</Route> */}
				<Route path="/friends" exact>
					<Friends />
				</Route>
				
			</Switch>
		</ChakraProvider>
	);
}

export default App;


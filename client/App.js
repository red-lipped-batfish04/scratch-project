import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register';
import HabitDashboard from './components/HabitDashboard';

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
			</Switch>
		</ChakraProvider>
	);
}

export default App;


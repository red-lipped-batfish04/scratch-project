import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from './components/HomePage'
import HabitDashboard from './components/HabitDashboard';

const App = () => {

  return (
		<ChakraProvider>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/Habits" exact>
					<HabitDashboard />
				</Route>
			</Switch>
		</ChakraProvider>
	);
}

export default App;


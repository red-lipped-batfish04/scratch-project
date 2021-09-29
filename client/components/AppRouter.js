import React from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import Register from './Register';
  import App from './App'; 
  import Login from './Login';
  import Habits from './Habits';
  import AddHabit from './AddHabit';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/habits" component={Habits} /> 
        <Route exact path="/addhabit" component={AddHabit} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/register" component={Register} />
        <Route path="/" component={App} />
      </Switch>   
      </BrowserRouter>  
    )
  };
};

 export default AppRouter;
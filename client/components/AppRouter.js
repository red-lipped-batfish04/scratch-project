import React from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import LoginAndRegister from './LoginAndRegister';
  import App from './App';
  import Login from './Login';

 class AppRouter extends React.Component{
   render(){
       return (
         <BrowserRouter>
         <Switch>
         <Route exact path="/register" component={LoginAndRegister} />
         <Route path='/' component={App} />
         <Route path='/login' component={LoginAndRegister} />
         </Switch>
         
         
         </BrowserRouter>  
       )
   }
 }

 export default AppRouter;
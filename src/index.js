import React from 'react';
import { render } from 'react-dom';
import App from '../client/components/App';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../client/components/AppRouter';

render(
  <div>
   <AppRouter/>
  </div>
 , document.getElementById('root')
);

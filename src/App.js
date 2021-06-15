import React from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Login from './components/Login'
import Products from './components/Products'
import Register from './components/Register'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Products} />
          <Route path='/main' component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

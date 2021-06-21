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
          <Route path='/login' exact component={Login} />
          <Route path='/main' exact component={Products} />
          <Route path='/register' exact component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

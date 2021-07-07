import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login'
import Products from './components/Products'
import Register from './components/Register'
import {Provider} from './context/Context'
import './App.css';

function App() {

  return (
    <Provider>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/main' exact component={Products} />
            <Route path='/register' exact component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

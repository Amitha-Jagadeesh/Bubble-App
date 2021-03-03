/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import UserData from './UserData';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path = '/' component = { Home } exact />
            <Route path = '/login' component = { Login } exact />
            <Route path = '/user' component = { UserData } exact />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

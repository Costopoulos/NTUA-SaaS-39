import './App.css';
import Signin from './components/signin';
import Signup from './components/signup';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path = "/signin" component = {Signin}/>
        <Route exact path = "/signup" component = {Signup}/>
      </Switch>
    </Router>
  );
}

export default App;

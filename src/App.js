import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'
import {BrowserRouter as Router, Route,Switch}from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import NotFound from "./component/NotFound";
import Home from './page/home';
import NavigationBar from "./component/navbar";

//initial data
import Users from './assets/data/users.json'
import Trips from './assets/data/trips.json'
localStorage.setItem('Users',JSON.stringify(Users))
localStorage.setItem('Trips',JSON.stringify(Trips))
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;

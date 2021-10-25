//styling
import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'

//component
import { useEffect,useContext } from "react";
import {BrowserRouter as Router, Route,Switch}from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";

//pages
import NotFound from "./component/NotFound";
import Home from './page/Home';
import DetailTour from "./page/DetailTour";


//initial data from json
import Users from './assets/data/users.json'
import Trips from './assets/data/trips.json'

//context
import { AppContextProvider } from "./contexts/AppContext";

//send data from json to localStorage
localStorage.setItem('Users',JSON.stringify(Users))
localStorage.setItem('Trips',JSON.stringify(Trips))

function App() {

  //lifeCycle did mount
  useEffect(() => {
    console.log("App component did mount")
    
  }, []);
  return (
    <AppContextProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute exact path="/detail-tour" component = {DetailTour} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
    </AppContextProvider>
  );
}

export default App;

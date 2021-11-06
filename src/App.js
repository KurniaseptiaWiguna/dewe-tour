//styling
import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'

//component
import { useEffect,useContext } from "react";
import {BrowserRouter as Router, Route,Switch,useParams}from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";

//pages
import NotFound from "./component/NotFound";
import Home from './page/Home';
import DetailTrip from "./page/DetailTrip";
import Payment from "./page/Payment";
import Profile from './page/Profile';

//initial data from json
import Users from './assets/data/users.json'
import Trips from './assets/data/trips.json'
import Transactions from './assets/data/transactions.json';
//context
import { AppContext,AppContextProvider } from "./contexts/AppContext";



//send data from json to localStorage
// localStorage.setItem('Users',JSON.stringify(Users))
// localStorage.setItem('Trips',JSON.stringify(Trips))
// localStorage.setItem('Transactions',JSON.stringify(Transactions))


function initialData() {
  const userData = JSON.parse(localStorage.getItem("Users"));
  const tripData = JSON.parse(localStorage.getItem("Trips"));
  const transactionData = JSON.parse(localStorage.getItem("Transaction"));

  if(!userData){
    localStorage.setItem('Users',JSON.stringify(Users))
  }
  if(!tripData){
    localStorage.setItem('Trips',JSON.stringify(Trips))
  }
  if(!transactionData){
    localStorage.setItem('Transactions',JSON.stringify(Transactions))
  }
}
function App() {
  //lifeCycle did mount
  useEffect(() => {
    initialData();
    console.log("App component did mount")
  }, []);
  return (
    <AppContextProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute exact path="/detail-trip/:id" component={DetailTrip} />
        <PrivateRoute exact path="/payment/:id/:idTrip" component={Payment} />
        <PrivateRoute exact path="/profile/:id" component= {Profile}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
    </AppContextProvider>
  );
}

export default App;

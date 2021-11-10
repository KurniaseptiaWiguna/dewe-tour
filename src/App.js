//styling
import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'

//component
import { useEffect,useContext } from "react";
import {BrowserRouter as Router, Route,Switch,useParams}from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute"
//pages
import NotFound from "./component/NotFound";
import Home from './page/Home';
import DetailTrip from "./page/DetailTrip";
import Payment from "./page/Payment";
import PaymentList from './page/PaymentList'
import Profile from './page/Profile';
import Trip from './page/Trips';
import AddTrip from "./page/AddTrip";
import TransactionsPage from './page/Transactions';
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
        <PrivateRoute exact path="/detail-trip/:id" component={DetailTrip} />
        <PrivateRoute exact path="/Paymentlist" component= {PaymentList} />
        <PrivateRoute exact path="/profile" component= {Profile} />
        <PrivateRoute exact path="/payment/:id" component={Payment} />
        <PrivateRoute exact path="/payment/:id" component={Payment} />
        <AdminRoute exact path="/trips" component= {Trip}/>
        <AdminRoute exact path="/transactions" component={TransactionsPage} />
        <AdminRoute exact path="/add-trip" component={AddTrip} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
    </AppContextProvider>
  );
}

export default App;

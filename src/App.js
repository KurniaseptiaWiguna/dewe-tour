//styling
import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'

//component
import { useState,useEffect,useContext } from "react";
import {BrowserRouter as Router, Route,Switch, useHistory}from "react-router-dom";
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
import Loading from './component/Loading';
//context
import { AppContext} from "./contexts/AppContext";
import UserTransaction from "./component/profile/UserTransaction";
import {API} from './config/api'
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute"
function App() {
  const api = API();
  const route = useHistory();
  const [state,dispatch] = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const checkUser = async () => {
    try {
      const config = {
              method: "GET",
              headers: {
                Authorization: "Basic " + localStorage.token,
              },
            };
      const response = await api.get("/checkAuth", config);
      if(response.status == "success"){
        dispatch({
          type: "USER_SUCCESS",
          payload: response.data.user,
              });
      }
      const status = response.data.user.status;
      
      
    } catch (error) {
      
    }
  }



  useEffect(() => {
    checkUser()
    setTimeout(() => setLoading(false),1000)
  }, []);
  useEffect(() => {
    console.log(state)
  }, [state])
  console.log(state)
  return (
    <>
    {loading === false ? (
      <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <PrivateRoute exact path="/detail-trip/:id" component={DetailTrip} />
        <PrivateRoute exact path="/Paymentlist" component= {PaymentList} />
        <PrivateRoute exact path="/profile" component= {Profile} />
        <PrivateRoute exact path="/payment/:id" component={Payment} />
        {/* <Route exact path="/payment/:id" component={Payment} /> */}
        <AdminRoute exact path="/trips" component= {Trip}/>
        <AdminRoute exact path="/transactions" component={TransactionsPage} />
        <AdminRoute exact path="/add-trip" component={AddTrip} />
        <PrivateRoute exact path="/test" component={NotFound}/> 
        <Route component={NotFound}/>
      </Switch>
    </Router>
    ) : (
      <Loading />
    )}
    
    </>
  );
}

export default App;

//styling
import "bootstrap/dist/css/bootstrap.min.css";
import './style/style.css'

//component
import { useState,useEffect,useContext } from "react";
import {BrowserRouter as Router, Route,Switch}from "react-router-dom";
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

function App() {
  const [state,dispatch] = useContext(AppContext)
  const [loading, setLoading] = useState(true)
//   const checkUser = async () => {
//   try {
//     const config = {
//       method: "GET",
//       headers: {
//         Authorization: "Basic " + localStorage.token,
//       },
//     };
//     // const response = await api.get("/check-auth", config);
//     const response = await api.get("/user",config)
//     console.log(response.status)
//     // If the token incorrect
//     if (response.status === "failed") {
//       return dispatch({
//         type: "AUTH_ERROR",
//       });
//     }
//     let payload = response.data.user;
//     // payload.token = localStorage.token;
    
//     // // Send data to useContext
//     dispatch({
//       type: "USER_SUCCESS",
//       payload: payload,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
  useEffect(() => {
    setTimeout(() => setLoading(false),1000)
  }, []);
  
  return (
    <>
    {loading === false ? (
      <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/detail-trip/:id" component={DetailTrip} />
        <Route exact path="/Paymentlist" component= {PaymentList} />
        <Route exact path="/profile" component= {Profile} />
        <Route exact path="/payment/:id" component={Payment} />
        {/* <Route exact path="/payment/:id" component={Payment} /> */}
        <Route exact path="/trips" component= {Trip}/>
        <Route exact path="/transactions" component={TransactionsPage} />
        <Route exact path="/add-trip" component={AddTrip} />
        <Route exact path="/test" component= {UserTransaction}/>
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

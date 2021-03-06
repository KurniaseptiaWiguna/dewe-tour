// import necessary utility from rrd
import { Redirect, Route } from "react-router-dom";
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext'
// create component here
function PrivateRoute({component: Component, ...rest}) {
    const [state,dispatch] = useContext(AppContext)
    const isLogin = localStorage.getItem('token');
    const loginData = JSON.parse(localStorage.getItem('user'));
    // const role = loginData.map((data) =>  {return data.user.role});
    console.log(loginData)
    console.log(isLogin);
    console.log(state)
    return (
        
        <>

            <Route {...rest} render={(props) =>(state.isLogin != "" && state.status == "admin"  ? <Component {...props} /> : (<Redirect to="/" /> ))}/>
        </>
    )
}

export default PrivateRoute
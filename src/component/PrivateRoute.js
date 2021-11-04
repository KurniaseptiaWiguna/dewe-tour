// import necessary utility from rrd
import { Redirect, Route } from "react-router-dom";
import {useContext} from 'react';
// create component here
function PrivateRoute({component: Component, ...rest}) {
    
    const isLogin = localStorage.getItem('user');
    console.log(isLogin);
    return (
        
        <>

            <Route {...rest} render={(props) =>(isLogin ? <Component {...props} /> : (<Redirect to="/" /> ))}/>
        </>
    )
}

export default PrivateRoute
// import necessary utility from rrd
import { Redirect, Route } from "react-router-dom";

// create component here
function PrivateRoute({component: Component, ...rest}) {
    const isSignIn = localStorage.getItem('login');
    console.log(isSignIn);
    return (
        
        <>

            <Route {...rest} render={(props) =>(isSignIn ? <Component {...props} /> : <Redirect to="/" />)}/>
        </>
    )
}

export default PrivateRoute
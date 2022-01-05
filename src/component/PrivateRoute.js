// import necessary utility from rrd
import { Redirect, Route } from "react-router-dom";
import {useContext} from 'react';
import {AppContext} from '../contexts/AppContext'
// create component here
function PrivateRoute({component: Component, ...rest}) {
    const [state, dispatch] = useContext(AppContext)
    const isLogin = localStorage.getItem('user');
    console.log(isLogin);
    console.log(state)
    if(state.isLogin == true){
        console.log(state.user)
    }
    //<Component {...props} />
    return (
        
        <>

            <Route {...rest} render={(props) =>(state.isLogin == true ? <Component {...props} /> : (<Redirect to="/" /> ))}/>
        </>
    )
}

export default PrivateRoute
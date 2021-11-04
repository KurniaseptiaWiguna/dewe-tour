import {useEffect} from "react";
import { Button} from 'react-bootstrap'
function Guest({dispatch}) {
    useEffect(() => {
        dispatch({type:'AUTH'});
    }, [])
    return (
        <>
            <Button variant="outline-light" className="px-4 mx-4" onClick={()=> dispatch({ type: 'SHOW_LOGIN' })}>Login</Button>
            <Button variant="warning" className="px-4 mx-4" onClick={()=> dispatch({ type: 'SHOW_REGISTER' })}>Register</Button>  
        </>
    )
}

export default Guest

import { render } from "@testing-library/react";
import {useEffect,useState, useRef} from "react";
import { NavLink,Button,OverlayTrigger,Overlay,Popover} from 'react-bootstrap'
function User({state,dispatch}) {
 
  const popover = (
    <Popover id="popover-basic">
      
      <Popover.Content>
        <NavLink onClick={()=> dispatch({ type: 'LOGOUT' })}>Logout</NavLink>
      </Popover.Content>
    </Popover>
  );
  const DropDown = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <img src={require("../../assets/img/profile.png").default} height="68px" style={{cursor:"pointer"}}/>
    </OverlayTrigger>
  );
    useEffect(() => {
        dispatch({type:'AUTH'});
    }, [])

    useEffect(() => {
        
        
    }, [state])
    return (
        <>
            
            <DropDown />
            
            
        </>
    )
}

export default User

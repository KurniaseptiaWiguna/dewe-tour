import {useEffect,useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import { NavLink,Button,OverlayTrigger,Overlay,Popover} from 'react-bootstrap'
function User({state,dispatch}) {
 const route = useHistory();
  const popover = (
    <Popover id="popover-basic">
      
      <Popover.Content>
      <NavLink onClick={()=> route.push('/profile/1')}>Profile</NavLink>
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

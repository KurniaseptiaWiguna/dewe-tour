import {useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { NavLink,OverlayTrigger,Overlay,Popover,Row,Col,Image} from 'react-bootstrap'
import {AppContext} from '../../contexts/AppContext';
function User() {
  const [state, dispatch] = useContext(AppContext)

 const route = useHistory();
//  const validation = () => {
//    if(state1.user.role == "admin"){
//      return admin;
//    }
//    return user;
//  }
  useEffect(() => {
    console.log(state)
  }, [state])

// console.log(user);
  const UserDropDown = (
    <Popover id="popover-basic" onHide="auto">
      
      <Popover.Content>
        <NavLink className="my-0" onClick={()=> route.push('/profile')}>
          <Row>
          <Col><img src={require("../../assets/img/user 2.png").default} height="28px" style={{cursor:"pointer",paddingBottom:"0px"}}/></Col><Col>Profile</Col>
          </Row>
          </NavLink>
        <NavLink onClick={()=> route.push('/paymentlist')}>
        <Row>
          <Col><img src={require("../../assets/img/bill 1.png").default} height="30px" style={{cursor:"pointer"}}/></Col><Col>Pay</Col>
          </Row>
        </NavLink>
        <NavLink onClick={()=> {document.location.reload(); dispatch({ type: 'LOGOUT' }); route.push("/"); }}>
        <Row >
          <Col><img src={require("../../assets/img/logout 1.png").default} height="30px" style={{cursor:"pointer"}}/></Col><Col>Logout</Col>
          </Row>
        </NavLink>
      </Popover.Content>
    </Popover>
  );
  const AdminDropDown = (
    <Popover id="popover-basic" onHide="auto">
      
      <Popover.Content>
        <NavLink onClick={()=> route.push('/trips')}>
        <Row>
          <Col><img src={require("../../assets/img/journey 1.png").default} height="30px" style={{cursor:"pointer"}}/></Col><Col>Trip</Col>
          </Row>
        </NavLink>
        <NavLink onClick={()=> route.push('/transactions')}>
        <Row>
          <Col><img src={require("../../assets/img/transaction-history.png").default} height="30px" style={{cursor:"pointer"}}/></Col><Col>transaction</Col>
          </Row>
        </NavLink>
        <NavLink onClick={()=> { document.location.reload();dispatch({ type: 'LOGOUT' }); route.push("/");}}>
        <Row >
          <Col><img src={require("../../assets/img/logout 1.png").default} height="30px" style={{cursor:"pointer"}}/></Col><Col>Logout</Col>
          </Row>
        </NavLink>
      </Popover.Content>
    </Popover>
  );
  const DropDown = () => (
    // <></>
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={
      
      state.status === "admin" ? AdminDropDown : UserDropDown 
      } >
      <img src={require("../../assets/img/profile.png").default} height="68px" style={{cursor:"pointer"}}/>
    </OverlayTrigger>
  );
    
    return (
        <>
            
            <DropDown />
            
            
        </>
    )
}

export default User

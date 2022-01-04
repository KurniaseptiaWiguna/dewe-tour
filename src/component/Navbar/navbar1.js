import React, {useReducer,useContext,useEffect} from 'react';
import { Nav, Navbar,Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LoginModal from '../modal/Login'
import RegisterModal from '../modal/Register'
import Admin from './Admin';
import Guest from './Guest';
import User from './User';
import {AppContext} from '../../contexts/AppContext.js'
export default function NavigationBar(){
    const [state,dispatch]= useContext(AppContext);
    const token = localStorage.getItem("token");
    const status = () => {
		if (!token) {
			return <Guest state={state} dispatch={dispatch} />;
		}else{
            return <User state={state} dispatch={dispatch}/>
        }
        
		
	};
    
    

    return(
        <>
        <Navbar bg="transparent" variant="dark">
            <Container>
                <Nav>
                <Navbar.Brand href="#home">
                    <img src={require("../../assets/img/Icon.png").default} height="68px" alt="car" />
                </Navbar.Brand>
                </Nav>
                
                    <Nav>
                       {status()}
                    </Nav>
            </Container>
        </Navbar>
        <LoginModal
            handleClose={() => dispatch({ type: 'HIDE_LOGIN' })}
            switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
            show={state.modalLogin}
        />
        <RegisterModal
            handleClose={() => dispatch({ type: 'HIDE_REGISTER' })}
            switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
            show={state.modalRegister} 
        />
        
        </>
    )
}
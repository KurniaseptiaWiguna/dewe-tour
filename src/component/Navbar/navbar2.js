import React, {useReducer,useContext,useEffect} from 'react';
import { Nav, Navbar,Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LoginModal from '../modal/Login'
import RegisterModal from '../modal/Register'
import { useHistory } from 'react-router-dom';
import Guest from './Guest';
import User from './User';
import {AppContext} from '../../contexts/AppContext.js'
export default function NavigationBar(){
    const [state,dispatch]= useContext(AppContext);
    const route = useHistory();
    const status = () => {
		if (!state.isLogin) {
			return <Guest dispatch={dispatch} />;
		}else{
            return <User dispatch={dispatch}/>
        }
        
		
	};
    
    

    return(
        <>
        <Navbar variant="light" className="bg-navbar shadow-lg" style={{height:"70px"}}>
            <Container className="mb-2">
                <Nav>
                <Navbar.Brand onClick={(()=> {route.push('/')})}>
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
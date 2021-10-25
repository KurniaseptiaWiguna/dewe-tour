import React, {useReducer,useEffect} from 'react';
import { Nav, Navbar,Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LoginModal from './modal/Login'
import RegisterModal from '../component/modal/register'
export default function NavigationBar(){
    const initialState= {
        modalLogin: false,
        modalRegister:false,
    }
    function reducer(state,action) {
        switch (action.type){
            case 'SHOW_LOGIN':
                return {modalLogin: true};
            case 'SHOW_REGISTER':
                return{modalRegister: true};
            case 'HIDE_LOGIN':
                return {modalLogin:false};
            case 'HIDE_REGISTER':
                return {modalRegister:false};
            case 'SWITCH_MODAL':
                return {
                    modalRegister: !state.modalRegister,
                    modalLogin : !state.modalLogin,
                };
            default: throw new Error();    
        }
    }
    const [state, dispatch]=useReducer(reducer,initialState)

    return(
        <>
        <Navbar bg="transparent" variant="dark">
            <Container>
                <Nav>
                <Navbar.Brand href="#home">
                    <img src={require("../assets/img/Icon.png").default} height="68px" alt="car" />
                </Navbar.Brand>
                </Nav>
                
                    <Nav>
                       <Button variant="outline-light" className="px-4 mx-4" onClick={()=> dispatch({ type: 'SHOW_LOGIN' })}>Login</Button>
                       <Button variant="warning" className="px-4 mx-4" onClick={()=> dispatch({ type: 'SHOW_REGISTER' })}>Register</Button>
                    </Nav>
            </Container>
        </Navbar>
        <LoginModal
            handleClose={() => dispatch({ type: 'HIDE_LOGIN' })}
            switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
            show={state.modalLogin}
        />
        
        </>
    )
}
import {useState, useContext} from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Modal,
    Button,
    NavLink
} from 'react-bootstrap'
import { useHistory } from 'react-router'
import { AppContext } from '../../contexts/AppContext';

function Login(props) {
    const route = useHistory();
    const [state, dispatch]= useContext(AppContext)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [data,setData] = useState(JSON.parse(localStorage.getItem("Users")));

    

    async function handleOnSubmit(e) {
        e.preventDefault();
        try{
            
            let newData = data.filter((d) => d.email === email);
            
            console.log(newData)
            

            let role=newData.map(d => {
                return d.role
            });
            role = role.toString();
            let pass =newData.map((d) => { return d.password}).join('') ; 
            console.log(pass);
            if(newData.length > 0){
            if(pass === password){
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        email,
                        password,
                        role,
                    }
                })
                setEmail("");
                setPassword("")
                route('/')
                
            }else{
                console.log("wrong password")
            }
            
        }else{
            console.log("wrong email and password");
        }
        }catch(e){

        }
        
    }
    

    
    return (
        <>
           <Modal show={props.show} onHide={props.handleClose} className="modal-dialog-centered" style={{width:"20rem",marginLeft:"40%"}}>
               <Row>
                   <Col><span className="leaf position-absolute  top-0 start-100 align-items-right"></span></Col>
                   <Col>
                        <Modal.Title className="text-center font-weight-bolder mt-4"><strong>Login</strong></Modal.Title>
                   </Col>
                   <Col><span className="hibiscus  top-0 float-end"></span></Col>
               </Row>
                <Modal.Body className="rounded" >
                    <Container className="my-4" >
                        
                        
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group className="my-4">
                            <Form.Label className="font-weight-bold" >Email</Form.Label>
                                <input id="email" className="form-control border custom-input"size="lg"type="email" onChange={ e => setEmail(e.target.value) } value={email || ''}  required/>
                            </Form.Group>
                                                    <Form.Group className="my-4">
                                                    <Form.Label className="font-weight-bold">Password</Form.Label>
                                                    <input id="password" className="form-control border custom-input"size="lg"type="password" onChange={ e => setPassword(e.target.value) } value={password || ''}  required/>
                                                    </Form.Group>
                                                    
                                                        <Button variant="warning" size="lg" type="submit" block>Login</Button>
                                                     
                                                    <NavLink onClick={props.switchModal} className="text-center text-secondary font-size-sm">Don't have an account? Click <span className="fw-bolder">Here</span></NavLink>
                                                </Form>
                                            </Container>
                                        </Modal.Body>
                                    </Modal> 
        </>
    )
}

export default Login

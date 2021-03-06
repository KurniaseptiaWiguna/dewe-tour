import {useState, useContext} from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Modal,
    Button,
    NavLink,
    Alert
} from 'react-bootstrap'
import { useHistory } from 'react-router'
import { AppContext } from '../../contexts/AppContext';
import {API} from '../../config/api'
function Login(props) {
    const route = useHistory();
    let api = API();
    const [state, dispatch] = useContext(AppContext)
    const [message, setMessage] = useState(null)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [data,setData] = useState(JSON.parse(localStorage.getItem("Users")));
    const form = {
        email: email,
        password: password
    }
    

    async function handleOnSubmit(e) {
        e.preventDefault();
        try{
            const body = JSON.stringify(form)
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: body
            };
            
            console.log(body)
            const response = await api.post("/login", config);

            console.log(response);
            // if(response.status === "success"){
                dispatch({
                    type: 'LOGIN',
                    payload:{
                        id: response.data.id,
                        name: response.data.fullname,
                        email: response.data.email,
                        status: response.data.status,
                        token: response.data.token,
                    }
                });
                localStorage.setItem("token", response.data.token)

                if(response.status === "success"){
                    const alert = (
                        <Alert variant='success' className='py-1'>
                            Login success
                        </Alert>
                    )
                    setMessage(alert)
                    
                    if(response.data.status === "admin"){
                        route.push("/transactions")

                    }else{
                        route.push("/transactions")

                    }
                }else{
                    const alert = (
                        <Alert variant='danger' className='py-1'>
                            Login failed
                        </Alert>
                    )
                    setMessage(alert)
                }
                    document.location.reload(true)
                
            
        }catch(error){
            const alert = (
                <Alert variant='danger' className='py-1'>
                    Login failed
                </Alert>
            )
            setMessage(alert)
            console.log(error)
        }
        
    }
    

    
    return (
        <>
           <Modal show={props.show} onHide={props.handleClose} className="modal-dialog-centered" style={{width:"20rem",marginLeft:"40%"}}>
               {message && message}
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

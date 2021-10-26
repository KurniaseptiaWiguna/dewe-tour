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

function Register(props) {
    const route = useHistory();
    const [state, dispatch]= useContext(AppContext)
    const [fullName, setFullName]= useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [data,setData] = useState(JSON.parse(localStorage.getItem("Users")));

    

    async function handleOnSubmit(e) {
        e.preventDefault();
        const role ="user"
        try{
            
                dispatch({
                    type: 'REGISTER',
                    payload: {
                        fullName,
                        email,
                        password,
                        phone,
                        role,
                    }
                })
                
        }catch(e){
            console.log(e)
        }
        
    }
    

    
    return (
        <>
           <Modal show={props.show} onHide={props.handleClose} className="modal-dialog-centered" style={{width:"20rem",marginLeft:"40%"}}>
               <Row>
                   <Col><span className="leaf position-absolute  top-0 start-100 align-items-right"></span></Col>
                   <Col>
                        <Modal.Title className="text-center font-weight-bolder mt-4"><strong>Register</strong></Modal.Title>
                   </Col>
                   <Col><span className="hibiscus  top-0 float-end"></span></Col>
               </Row>
                <Modal.Body className="rounded" >
                    <Container className="my-4" >
                        
                        
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group className="my-1">
                                <Form.Label className="font-weight-bold" >Full Name</Form.Label>
                                <input id="email" className="form-control border custom-input"size="lg"type="text" onChange={ e => setFullName(e.target.value) } value={fullName || ''}  required/>
                            </Form.Group>
                            <Form.Group className="my-1">
                                <Form.Label className="font-weight-bold" >Email</Form.Label>
                                <input id="email" className="form-control border custom-input"size="lg"type="email" onChange={ e => setEmail(e.target.value) } value={email || ''}  required/>
                            </Form.Group>
                            <Form.Group className="my-1">
                                <Form.Label className="font-weight-bold">Password</Form.Label>
                                <input id="password" className="form-control border custom-input"size="lg"type="password" onChange={ e => setPassword(e.target.value) } value={password || ''}  required/>
                            </Form.Group>
                            <Form.Group className="my-1">
                                <Form.Label className="font-weight-bold" >Phone</Form.Label>
                                <input id="email" className="form-control border custom-input"size="lg"type="text" onChange={ e => setPhone(e.target.value) } value={phone || ''}  required/>
                            </Form.Group>
                                                    
                            <Button variant="warning" type="submit" block>Reigister</Button>
                                                     
                            <NavLink onClick={props.switchModal} className="text-center text-secondary font-size-sm">Don't have an account? Click <span className="fw-bolder">Here</span></NavLink>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal> 
        </>
    )
}

export default Register

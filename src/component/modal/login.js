import {
    Container,
    Form,
    Modal,
    Button,
    NavLink
} from 'react-bootstrap'
function login(props) {
    return (
        <>
           <Modal show={props.show} onHide={props.handleClose} width="18rem">
                <Modal.Body className="rounded" >
                    <Container className="my-4" >
                        <h1 className="text-center mt-4 mb-4 ">Login</h1>
                        <Form >
                            <Form.Group className="my-4">
                            <Form.Label className="font-weight-bold">Email</Form.Label>
                                <input id="basic-addon2" className="form-control border custom-input"size="lg"type="email" placeholder="Email" />
                            </Form.Group>
                                                    <Form.Group className="my-4">
                                                    <Form.Label className="font-weight-bold">Password</Form.Label>
                                                    <input className="form-control border custom-input"size="lg"type="password" placeholder="Password"/>
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

export default login

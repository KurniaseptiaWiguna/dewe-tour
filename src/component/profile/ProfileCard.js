import {useContext,useState} from 'react'
import { Container, Row, Col, Modal, Button,Image} from 'react-bootstrap'
import {AppContext} from '../../contexts/AppContext';
import {IoPersonCircleSharp} from 'react-icons/io5';
import {MdEmail,MdPhone,MdLocationPin} from 'react-icons/md';
import PaymentCard from '../payment/PaymentCard';
function ProfileCard() {
    
    const [state, dispatch] = useContext(AppContext)
    const Users = JSON.parse(localStorage.getItem('Users'));
    const email = state.user.email;
    const user = Users.filter((filter) => filter.email == email)
    console.log(user)
    return (
        <>
            <Modal.Dialog size="lg">
                <Modal.Body>
                    {user.map(d => { return(
                    <> 

                    <Row>
                        <Col>
                            
                            
                            
                            
                            <h2 className="font-weight-bold">Personal info</h2>
                            <Row>
                                <Col md="auto">
                                    <IoPersonCircleSharp size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                    <Row><h5>{d.fullname}</h5></Row>
                                    <Row>Full name</Row>
                                    
                                </Col>    
                            </Row>
                            <Row>
                            <Col md="auto">
                                <MdEmail size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{d.email}</h5></Row>
                                    <Row>Email</Row>
                                </Col> 
                                
                            </Row>
                            <Row>
                            <Col md="auto">
                            <MdPhone size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{d.phone}</h5></Row>
                                    <Row>Phone</Row>
                                </Col> 
                                
                            </Row>
                            <Row>
                            <Col md="auto">
                            <MdLocationPin size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{d.address}</h5></Row>
                                    <Row>Address</Row>
                                </Col> 
                                
                            </Row>
                            
                            
                            
                        </Col>
                        <Col>
                            <Container>
                            <Image src={require(`../../assets/img/${d.photo}`).default} className="float-right" style={{width: "15rem"}} rounded/>
                            <Button variant="warning" className="text-light d-grid gap-2" className="float-right my-2" style={{width: "15rem"}} block>
                                Change Photo Profile
                            </Button>
                            </Container>
                        </Col>
                    </Row>

                    </>
                        )
                    })}
                </Modal.Body>
            </Modal.Dialog>
            
        </>
    )
}

export default ProfileCard

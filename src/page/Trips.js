import TripCard from "../component/Trips/TripCard"
import Navbar from "../component/Navbar/navbar2";
import Footer from "../component/footer"
import { Container,Row,Col,Button,Modal,Form, Alert } from "react-bootstrap"
import {useHistory} from 'react-router-dom';
import {useEffect, useState,useContext} from 'react'
import { API } from "../config/api";
import { AppContext } from "../contexts/AppContext";
import Loading from "../component/modal/Loading";

function Trips() {
    const api = API();
    const route = useHistory();
    const [state,dispatch] = useContext(AppContext);
    const [message, setMessage] = useState(null)
    const [show, setShow] = useState(false);
    const handleOpen = () => {setShow(true)}
    const handleClose = () => {setShow(false)};
    const [form,setForm] = useState({
        name: "",
    })
    const handleChange =async (e) => {
            setForm({
                [e.target.name]: e.target.value,
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = JSON.stringify(form)
            console.log(body)
            const config = {
                method: "POST",
                headers: {
                  Authorization: "Basic " + localStorage.token,
                  "Content-type": "application/json",
                },
                body: body

              };
            const response = await api.post("/country",config);
            if(response.status === "success"){
                setForm({
                    name: "",
                })
                handleClose();
            }
            if(response.status === "failed"){
                const alert = (
                    <Alert variant='danger' className='py-1'>
                        <p>{response.message}</p>
                    </Alert>
                )
                setMessage(alert);
            }
            
            
        } catch (error) {
            const alert = (
                <Alert variant='danger' className='py-1'>
                    <p>{error}</p>
                </Alert>
            )
            setMessage(alert);
            console.log(error)
        }
    }
    useEffect(() => {
        setTimeout(() => dispatch({
            type: 'HIDE_LOADING'
        }),1000)
    }, [])
    useEffect(() => {
        console.log(form.name)
    }, [form])
    return (
        <>
            <div className="cover-page">
            <Navbar/>
            <Container>
                <Row>
                    <Col><h1 className="mt-5">Income Trip</h1></Col>
                    <Col>
                    <Button variant="warning" className="mt-5 float-right text-white mx-2 mr-5" onClick={handleOpen}>Add Country</Button>
                    <Button variant="warning" className="mt-5 float-right text-white" onClick={()=> {route.push("/add-trip")}}>Add Trip</Button>
                    </Col>
                </Row>
            
            </Container>
            <TripCard />
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Input Country
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control name="name" placeholder="Country name" onChange={handleChange} required/>
                        </Form.Group>
                        
                        <Form.Group className="float-right">
                            <Button variant="danger" className="mx-3"  onClick={handleClose}>Close</Button>
                            <Button variant="warning" className="mx-3" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                    
                </Modal.Body>
            </Modal>
            <Footer/>
            <Loading />
        </>
    )
}

export default Trips

import {useState, useContext} from 'react'
import {Container,Row,Col,Form, Button} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import Footer from '../component/footer';
import { converToRupiah } from '../assets/Currency';
import {AppContext} from '../contexts/AppContext'
function AddTrip() {
    const [state, dispatch] = useContext(AppContext);
    const [title, setTitle] = useState();
    const [country, setCountry] = useState();
    const [accommodation, setAccommodation] = useState();
    const [transportation, setTransportation] = useState();
    const [eat, setEat] = useState();
    const [day, setDay] = useState();
    const [night, setNight] = useState();
    const [dateTrip, setDateTrip] = useState();
    const [price, setPrice] = useState();
    const [quota, setQuota] = useState();
    const [description, setDescription] = useState();

    function handleOnSubmit(e){
        e.preventDefault();
        console.log(title);
        console.log(Number(price))
        dispatch({
            type: 'ADD_TRIP',
            payload: {
                title,
                country,
                accommodation,
                transportation,
                eat,
                day,
                night,
                dateTrip,
                price,
                quota,
                description
            }
        })
    }
    return (
        <>
            <NavigationBar />
            <Container>
                <h2>Add Trip</h2>
                <Container className="my-4">
                    <Form className="px-3" onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title Trip</Form.Label>
                            <Form.Control className="bg-light" onChange={ e => setTitle(e.target.value) } value={title || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control onChange={ e => setCountry(e.target.value) } value={country || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Accommodation</Form.Label>
                            <Form.Control onChange={ e => setAccommodation(e.target.value) } value={accommodation || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Transportation</Form.Label>
                            <Form.Control onChange={ e => setTransportation(e.target.value) } value={transportation || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Eat</Form.Label>
                            <Form.Control onChange={ e => setEat(e.target.value) } value={eat || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Row>
                                <Col>
                                <Row>
                                    <Col><Form.Control onChange={ e => setDay(e.target.value) } value={day || ''}  required/></Col>
                                    <Col><Form.Label>Day</Form.Label></Col>
                                    </Row>
                                </Col>
                                <Col>
                                <Row>
                                    <Col><Form.Control onChange={ e => setNight(e.target.value) } value={night || ''}  required/></Col>
                                    <Col><Form.Label>Night</Form.Label></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date Trip</Form.Label>
                            <Form.Control onChange={ e => setDateTrip(e.target.value) } value={dateTrip || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" onChange={ e => setPrice(e.target.value) } value={price || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quota</Form.Label>
                            <Form.Control onChange={ e => setQuota(e.target.value) } value={quota || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as ="textarea" rows={3} onChange={ e => setDescription(e.target.value) } value={description || ''}  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" variant="warning">Add Trip</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Container>
            <Footer/>
        </>
    )
}

export default AddTrip

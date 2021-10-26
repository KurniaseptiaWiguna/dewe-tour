import React from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Image
} from 'react-bootstrap';
import NavigationBar from "../component/Navbar/navbar2"
function DetailTour() {
    return (
        <>
            <NavigationBar />
            <Container>
                <h1 className="font-weight-bolder"></h1>
                <p>Country</p>
                <div></div>
                <p className="font-weight-bold">Information Trip</p>
                <Row></Row>
                <p className="font-wight-bold">Description</p>
            </Container>
        </>
    )
}

export default DetailTour

import TripCard from "../component/Trips/TripCard"
import Navbar from "../component/Navbar/navbar2";
import Footer from "../component/footer"
import { Container,Row,Col,Button } from "react-bootstrap"
import {useHistory} from 'react-router-dom';
function Trips() {
    const route = useHistory();
    return (
        <>
            <div className="cover-page">
            <Navbar/>
            <Container>
                <Row>
                    <Col><h1 className="mt-5">Income Trip</h1></Col>
                    <Col><Button variant="warning" className="mt-5 float-right text-white" onClick={()=> {route.push("/add-trip")}}>Add Trip</Button></Col>
                </Row>
            
            </Container>
            <TripCard />
            </div>
            <Footer/>
        </>
    )
}

export default Trips

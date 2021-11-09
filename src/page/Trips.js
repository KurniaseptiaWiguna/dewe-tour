import TripCard from "../component/Trips/TripCard"
import Navbar from "../component/Navbar/navbar2"
import { Container,Row,Col,Button } from "react-bootstrap"
function Trips() {
    return (
        <div>
            <Navbar/>
            <Container>
                <Row>
                    <Col><h1 className="mt-5">Income Trip</h1></Col>
                    <Col><Button></Button></Col>
                </Row>
            
            </Container>
            <TripCard />
        </div>
    )
}

export default Trips

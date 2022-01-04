import {Row,Col} from 'react-bootstrap'
function Content(props) {
    const duration = props.day +" day "+ props.night + " night"; 
    return (
        <>
            <h5 className="font-weight-bold my-4" >Information Trip</h5>
            <Row>
                <Col>
                
                    <span className="text-secondary">Accomodation</span>
                    <Row>
                        <Col xs="auto"><img src={require("../../assets/img/hotel.png").default}/></Col>
                        <Col><h5>{props.accommodation}</h5></Col>
                    </Row> 
                    </Col>
                <Col><span className="text-secondary">Transportation</span>
                    <Row>
                        <Col xs="auto"><img src={require("../../assets/img/airplane.png").default}/></Col>
                        <Col><h5>{props.transportation}</h5></Col>
                    </Row> 
                 </Col>
                <Col>
                    <span className="text-secondary">Eat </span>
                    <Row>
                        <Col xs="auto"><img src={require("../../assets/img/meal.png").default}/></Col>
                        <Col><h5>{props.eat}</h5></Col>
                    </Row> 
                    
                </Col>
                <Col>
                    <span className="text-secondary">Duration </span>
                    <Row>
                        <Col xs="auto"><img src={require("../../assets/img/clock.png").default}/></Col>
                        <Col><h5>{duration}</h5></Col>
                    </Row> 
                </Col>
                <Col>
                    <span className="text-secondary">Date Trip </span>
                    <Row>
                        <Col xs="auto"><img src={require("../../assets/img/calendar.png").default}/></Col>
                        <Col><h5>{props.dateTrip}</h5></Col>
                    </Row> 
                    
                </Col>
            </Row>
            <h5 className="font-weight-bold">Description</h5>
            <p className="text-secondary">{props.description}</p>
        </>
    )
}

export default Content

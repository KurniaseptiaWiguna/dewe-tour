import {Row,Col} from 'react-bootstrap'
function Content(props) {
    const duration = props.day +" day "+ props.night + " night"; 
    return (
        <>
            <h5 className="font-weight-bold my-4" >Information Trip</h5>
            <Row>
                <Col><span className="text-secondary">Accomodation</span> <h5>{props.accommodation}</h5></Col>
                <Col><span className="text-secondary">Transportation</span> <h5>{props.transportation}</h5></Col>
                <Col><span className="text-secondary">Eat </span><h5>{props.eat}</h5></Col>
                <Col><span className="text-secondary">Duration </span><h5>{duration}</h5></Col>
                <Col><span className="text-secondary">Date Trip </span><h5>{props.dateTrip}</h5></Col>
            </Row>
            <h5 className="font-weight-bold">Description</h5>
            <p className="text-secondary">{props.description}</p>
        </>
    )
}

export default Content

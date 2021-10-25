import {Container,Row,Col,Card} from 'react-bootstrap';
import { converToRupiah } from '../../assets/Currency';
function TripCard() {
    const TripsData = JSON.parse(localStorage.getItem("Trips"))

    return (
        <Container>
            <Row>
                {
                TripsData.map(data => {
                    return(
                        <>
                            <Col>
                                <Card className="my-4 p-3" style={{width:"20rem",height:"20rem"}}>
                                    
                                    <img src={require(`../../assets/img/${data.photo}`).default} className="mx-auto mb-4" style={{width:"18rem",height:"18rem"}} position="center"/>
                                    <p className="my-0 p-0 font-weight-bold text-left">{data.title}</p>
                                    <Row>
                                        <Col><p className="font-weight-bold text-warning p-0 text-left">{converToRupiah(data.price)}</p></Col>
                                        <Col><p className="font-weight-bold text-secondary p-0 text-right">{data.country}</p></Col>    
                                    </Row>
                                </Card>
                            </Col>
                        </>
                    )
                })
                }
            </Row>
        </Container>
    )
}

export default TripCard

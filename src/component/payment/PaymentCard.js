import {useState, useEffect} from 'react';
import {Row,Col,Modal,Button,Table, Container} from 'react-bootstrap';
function PaymentCard() {
    return (
        <> 
           <Modal.Dialog size="xl" bg="dark">
            <Modal.Body className="p-3">
                <Container>
                <Row>
                    <Col><img src={require("../../assets/img/Icon2.png").default} height="50px"/></Col>
                    <Col md="auto" className="text-right float-right">
                        <Row>
                            <h2 >Booking</h2>
                        </Row>
                        <Row>
                            <h5 className="text-secondary">22 August 2020</h5>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <Row><h3>6D/4N Fun Tassie Vacation</h3></Row>
                        <Row><p>Australia</p></Row>
                        <Row>Waiting Approve</Row>
                    </Col>
                    <Col className="mx-3">
                        <Row>
                            <Col className="my-1">
                                <Row>Date Trip</Row>
                                <Row>26 August 2020</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Accomodation</Row>
                                <Row>Hotel 4 Nights</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-1"> 
                                <Row>Transportation</Row>
                                <Row>Qatar Airways</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Duration</Row>
                                <Row>6 days 4 nights</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
                <Table >
  <thead>
    <tr>
      <th>No</th>
      <th>Full Name</th>
      <th>Last Gemder</th>
      <th>Phone</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Qtu</td>
      <td>:1</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Total</td>
      <td className="text-danger">12.000.000</td>
    </tr>
    
  </tbody>
</Table>
                </Container>
            </Modal.Body>

            
            </Modal.Dialog>
            <Button variant="warning text-light" className="float-right px-5" size="lg">Pay</Button>
        </>
    )
}

export default PaymentCard

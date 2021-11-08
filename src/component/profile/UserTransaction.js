import {useState, useContext} from 'react';
import { useParams} from 'react-router-dom';
import {Row,Col,Modal,Button,Table, Container,Image} from 'react-bootstrap';
import {AppContext} from '../../contexts/AppContext';
import { converToRupiah } from '../../assets/Currency';
function UserTransaction() {
    const [state,dispatch]= useContext(AppContext);
    
    const params = useParams();
    const transaction = JSON.parse(localStorage.getItem("Transactions"));
    const [detailTransaction,setDetailTransaction] = useState(transaction.filter((filter) => filter.idUser == state.user.id));
    console.log(transaction)
    const trip =  JSON.parse(localStorage.getItem('Trips'));
    const detailTrip = trip.filter((filter) => filter.id == params.idTrip);
    
    const user =  JSON.parse(localStorage.getItem('Users'));
    const detailUser = user.filter((filter) => filter.email == state.user.email);

    return (
        <> 
        {detailTransaction.map(d => {
            const detailTrip = trip.filter((filter) => filter.id == d.idTrip);
            const displayStatus = () => {
                if(d.status == "Waiting payment"){
                    return <p className="text-danger">{d.status}</p>
                }else if(d.status == "Waiting Approve"){
                    return <p className="text-warning">{d.status}</p>
                }else{
                    return <p className="text-success">{d.status}</p>
                }
            }
            return(
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
                            <h5 className="text-secondary">{d.bookingDate}</h5>
                        </Row>
                    </Col>
                </Row>
                {detailTrip.map(t => {
            return(
                <>
                <Row>
                    <Col md="auto">
                        <Row ><h3 >{t.title}</h3></Row>
                        <Row><p>{t.country}</p></Row>
                        <Row>
                            {
                                <displayStatus />
                            }
                        </Row>
                    </Col>
                    <Col className="mx-3">
                        <Row>
                            <Col className="my-1">
                                <Row>Date Trip</Row>
                                <Row>{d.dateTrip}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Accomodation</Row>
                                <Row>{t.accommodation}</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-1"> 
                                <Row>Transportation</Row>
                                <Row>Qatar Airways</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Duration</Row>
                                <Row>{t.day} day {t.night} night</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Image src />
                    </Col>
                </Row>
                </>
                )
            })}

                <Table>
                {detailUser.map(u => {
            return(
                <>
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
                            <td>{u.fullname}</td>
                            <td>{u.gender}</td>
                            <td>{u.phone}</td>
                            <td>Qty</td>
                            <td>:{d.qty}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td className="text-danger">{converToRupiah(d.total)}</td>
                        </tr>
    
                    </tbody>
                    </>
                    )
            })}
                </Table>
                </Container>
            </Modal.Body>

            
            </Modal.Dialog>
            
            </>
            )
    })}
        </>
    )
    
}

export default UserTransaction

import {useState,useEffect, useContext} from 'react';
import { useParams} from 'react-router-dom';
import {Row,Col,Modal,Button,Table, Container,Image, ModalDialog} from 'react-bootstrap';
import {AppContext} from '../../contexts/AppContext';
import { useQuery } from 'react-query';
import { converToRupiah } from '../../assets/Currency';
import {API} from '../../config/api';
function UserTransaction() {
    let api = API()
    const [state,dispatch]= useContext(AppContext);
    const [transactions,setTransaction] = useState([])
    async function getData () {
        try {
            const config = {
                method: "GET",
                headers: {
                  Authorization: "Basic " + localStorage.token,
                },
              };
            const response2 = await api.get("/transaction/user", config);
            await console.log(response2)
            await setTransaction(response2.data)
        } catch (error) {
            console.log(error)
        }
    }
console.log(transactions);
console.log('this data transactions');
useEffect(() => {
    getData()
}, [])

    return (
        <> 
        
       
        {transactions?.map((item) => 
            
            <div key={item.id} style={{backgroundColor: "#fff", padding:"40px", margin: "20px"}}>
                <Row>
                    <Col><img src={require("../../assets/img/Icon2.png").default} height="50px"/></Col>
                    <Col md="auto" className="text-right float-right">
                        <Row>
                            <h2 >Booking</h2>
                        </Row>
                        <Row>
                            <h5 className="text-secondary">{item.bookingDate}</h5>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>{item.trip.title}</h2>
                        
                        <p>{item.status}</p>
                    </Col>


                    <Col>
                        <Row>
                            <Col>
                                <h6>Date trip</h6>
                                <p>{item.dateTrip}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Duration</h6>
                                <p>{item.trip.day + " day "+ item.trip.night + " night"}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h6>Accomodation</h6>
                                <p>{item.trip.accomodation}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Transportation</h6>
                                <p>{item.trip.transportation}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                   
                    
                </Row>
                <Table>
                
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{item.user.fullname}</td>
                            <td>{item.user.gender}</td>
                            <td>{item.user.phone}</td>
                            <td>Qty</td>
                            <td>:{item.qty}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td className="text-danger">{converToRupiah(item.total)}</td>
                        </tr>
    
                    </tbody>
                    
                   
                </Table>
            </div>
            // <ModalDialog>
            //     <h1>{item.trip.title}</h1>
            // </ModalDialog>
        
        ) }
        </>
    )
    
}

export default UserTransaction

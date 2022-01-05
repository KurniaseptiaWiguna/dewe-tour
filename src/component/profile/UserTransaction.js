import {useState,useEffect, useContext} from 'react';
import { useParams,NavLink} from 'react-router-dom';
import {Row,Col,Modal,Button,Table, Container,Image, ModalDialog} from 'react-bootstrap';
import {AppContext} from '../../contexts/AppContext';
import { useQuery } from 'react-query';
import { converToRupiah } from '../../assets/Currency';
import NoData from '../../assets/img/nodata.png'
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
        <h3 className='font-weight-bolder'>History Trip</h3>
        {transactions?.length > 0 ? ( transactions?.map(d => {
            const url = `/payment/${d.id}`;
            const getStatus = () => {
                switch(d.status){
                    case "Waiting Approve":
                        return <div className="px-2 text-warning fw-bold" style={{color: "yellow"}}>{d.status}</div>;
                    case "Waiting Payment":
                        return <div className="px-2 text-danger fw-bold" style={{color: "red"}}>{d.status}</div>;
                    case "Cancel":
                        return <div className="px-2 text-danger fw-bold" style={{color: "red"}}>{d.status}</div>;
                    case "Approved":
                        return <div className="px-2 text-success fw-bold" style={{color: "green"}}>{d.status}</div>;
                    
                    
                }
            }
            return(
                <>
                
            <NavLink to={url} style={{textDecoration: "none", color: "black"}} key={d.id}>
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
                        <Row> 
                        {/* onSubmit={(e) => handleSubmit.mutate(e)} */}
                        {/* <form >
                        {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
                           
                            </form> */}
                        </Row>
                    </Col>
                </Row>
                
                <>
                <Row>
                    <Col className="ml-4">
                        <Row ><h3 >{d.trip.title}</h3></Row>
                        <Row><p>{d.trip.country.name}</p></Row>
                        <Row>
                            {
                                getStatus()
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
                                <Row>{d.trip.accomodation}</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-1"> 
                                <Row>Transportation</Row>
                                <Row>{d.trip.transportation}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Duration</Row>
                                <Row>{d.trip.day} day {d.trip.night} night</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Image src />
                    </Col>
                </Row>
                </>
                
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
                            <td>{d.user.fullname}</td>
                            <td>{d.user.gender}</td>
                            <td>{d.user.phone}</td>
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
                    
                   
                </Table>
                </Container>
            </Modal.Body>

            
            </Modal.Dialog>
            </NavLink>
            </>
            )
    })) : (
        <div className="text-center align-self-sm-center">
            <div>
                <img src={NoData} width="200" />
            </div>
            <div>
            <h1 className="text-center">no data found</h1>
            </div>
        
        </div>
        )
    
    }
        </>
    )
    
}

export default UserTransaction

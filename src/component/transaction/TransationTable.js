import {useState,useEffect, useContext} from 'react';
import {Button, Table,Modal,Container,Row,Col,Image} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import TransactionModal from '../transaction/TransactionModal'
import {AppContext} from '../../contexts/AppContext'
import {converToRupiah} from '../../assets/Currency';
function TransationTable() {
    const [state,dispatch] = useContext(AppContext);
    const [dataId, setDataId] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const transactions = JSON.parse(localStorage.getItem("Transactions"));
    const users = JSON.parse(localStorage.getItem("Users"));
    const trips = JSON.parse(localStorage.getItem("Trips"))
    
    
    useEffect(() => {
        console.log("data id has been changed")
        console.log(dataId)
     }, [dataId])
    return (
        <>
           <Table striped bordered hover variant="light" className="shadow-lg my-5 pb-5" >
  <thead>
    <tr>
      <th>#</th>
      <th>Users</th>
      <th>Trip</th>
      <th>Bukti Transfer</th>
      <th>Status Payment</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {transactions.map((data)=> {
         const user = users.filter((filter) => filter.id == data.idUser);
         const fullname= user.map((data)=> { return data.fullname});
         console.log(user);
         console.log(fullname)
         const trip = trips.filter((filter) => filter.id == data.idTrip);
         const title = trip.map((data) => { return data.title});
         console.log(trip)
         const detailTransaction = transactions.filter((filter) => filter.id == data.id)
    

        

         return(
             <>
             
                <tr>
                    <td>{data.id}</td>
                    <td>{fullname}</td>
                    <td>{title}</td>
                    <td>{data.attachment}</td>
                    <td>{data.status}</td>
                    <td>
                        

  

  
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <img src={require("../../assets/img/search 1.png").default} height="30px" style={{cursor:"pointer"}} onClick={handleShow}/>

      <Modal show={show} onHide={handleClose} size="xl">
        
        

        {detailTransaction.map(d => {
            const detailTrip = trip.filter((filter) => filter.id == d.idTrip);
            const detailUser = user.filter((filter) => filter.id == d.idUser);
            const displayStatus = () => {
                if(d.status == "Waiting payment"){
                    return <p className="text-danger">{d.status}</p>
                }else if(d.status == "Waiting Approve"){
                    return <p className="text-warning">{d.status}</p>
                }else{
                    return <p className="text-success">{d.status}</p>
                }
            }
            function handleOnSubmit() {
        
                const oldData = transactions.filter((filter) => filter.id != d.id );
                const newData = detailTransaction.map((d) => {
                    return {
                        attachment: null,
                        bookingDate: d.bookingDate,
                        dateTrip: d.dateTrip,
                        id: d.id,
                        idTrip: d.idTrip,
                        idUser: d.idUser,
                        qty: d.qty,
                        status: "Approved",
                        total: d.total
                    }
                })
                let data = [ ...oldData, ...newData]
                localStorage.setItem("Transactions", JSON.stringify(data))
                
            }
            return(
                <>
                <Modal.Body>
            
           
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
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleOnSubmit}>
            Approve
          </Button>
        </Modal.Footer>
             </>
            )
    })}
        
      </Modal>
               </td>
                </tr>

                
             </>
            
         )
      })}
    
    
  </tbody>
</Table> 
        </>
    )
}

export default TransationTable

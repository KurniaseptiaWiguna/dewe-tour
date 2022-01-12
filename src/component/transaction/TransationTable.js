import {useState,useEffect, useContext} from 'react';
import {Button, Table,Modal,Container,Row,Col,Image} from 'react-bootstrap';
import {AppContext} from '../../contexts/AppContext'
import {converToRupiah} from '../../assets/Currency';
import { useQuery } from 'react-query';
import {API} from '../../config/api';
import moment from 'moment';
function TransationTable() {
    const [state,dispatch] = useContext(AppContext);
    
    const api = API();
    const [dataId, setDataId] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

  const config = {
        method: "GET",
        headers: {
            Authorization: "Basic " + localStorage.token,
        },

    };

   let {data: transaction,refetch} = useQuery("TransactionChache", async () => {
    const response = await api.get("/transactions", config);
    
    return response.data;
});
    console.log(transaction)
    const getDetailData = async () =>{
        const response = await api.get(`/transaction/${dataId}`,config);
        setDataModal(response.data);
    }
    const action = async (e) => {
        console.log(e)
        try {
            const form = {
                status: e,
            }
            const body = JSON.stringify(form);
            const config2 = {
                method: "PATCH",
                headers: {
                    "Authorization": "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
                body,
                

            };
            const response = await api.patch("update/"+dataId,  config2);
            console.log(response)
            refetch();
            handleClose()
        } catch (error) {
            console.log(error)
        }
        
    }

    const [dataModal, setDataModal] = useState(
        {
            id: "",
            idUser: "",
            dateTrip: "2021-11-03T00:00:00.000Z",
            bookingDate: "2021-12-31T20:53:34.000Z",
            qty: "",
            total: "",
            status: "",
            attachment: "",
            trip: {
                title: "",
                accomodation: "",
                transportation: "",
                eat: "",
                day: "",
                night: "",
                dateTrip: "2021-11-03",
                price: 0,
                quota: "",
                country: {
                    name: ""
                }
            },
            user: {
                id: "",
                fullname: "",
                email: "",
                phone: "",
                gender: "",
                address: "",
                photo: "",
                status: ""
            }
        });
    const getStatus = (status) => {
        switch(status){
            case "Waiting Approve":
                return <div className="px-2 text-warning fw-bold" style={{color: "rgba(247, 148, 30, 1)"}}>{status}</div>;
            case "Waiting Payment":
                return <div className="px-2 text-danger fw-bold" style={{color: "rgba(255, 7, 66, 1)"}}>{status}</div>;
            case "Cancel":
                return <div className="px-2 text-danger fw-bold" style={{color: "rgba(255, 7, 66, 1)"}}>{status}</div>;
            case "Approved":
                return <div className="px-2 text-success fw-bold" style={{color: "rgba(10, 207, 131, 1)"}}>{status}</div>;
            
            
        }
    }
    
    useEffect(() => {
        getDetailData();
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
      {transaction?.map((data)=> {
         return(
             <>
             
                <tr>
                    <td>{data.id}</td>
                    <td>{data.user.fullname}</td>
                    <td>{data.trip.title}</td>
                    <td>{<a href={`http://localhost:5000/uploads/${data.attachment}`} target="_blank">{data.attachment}</a>}</td>
                    <td>{getStatus(data.status)}</td>
                    <td>
       
      <img src={require("../../assets/img/search 1.png").default} height="30px" style={{cursor:"pointer"}} onClick={() => {setDataId(data.id); handleOpen()} }/>
      {
          
      }
      
               </td>
                </tr>

                
             </>
            
         )
      })}
    
    
  </tbody>
</Table> 
<Modal show={show} onHide={handleClose} size="lg">
    <Modal.Body>
        <Container>
                <Row>
                    <Col><img src={require("../../assets/img/Icon2.png").default} height="50px"/></Col>
                    <Col md="auto" className="text-right float-right">
                        <Row>
                            <h2 >Booking</h2>
                        </Row>
                        <Row>
                            <h5 className="text-secondary">{dataModal?.bookingDate}</h5>
                        </Row>
                        
                    </Col>
                </Row>
                <Container>
                <Row>
                    <Col >
                        <Row> <h3 >{dataModal?.trip.title}</h3></Row>
                        <Row><p>{dataModal?.trip.country.name}</p></Row>
                        <Row>
                            {
                                getStatus(dataModal?.status)
                            }
                        </Row>
                    </Col>
                    <Col className="mx-3">
                        <Row>
                            <Col className="my-1">
                                <Row>Date Trip</Row>
                                <Row>{moment(dataModal?.dateTrip).format("llll")}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Accomodation</Row>
                                <Row>{dataModal?.trip.accomodation}</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-1"> 
                                <Row>Transportation</Row>
                                <Row>{dataModal?.trip.transportation}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Duration</Row>
                                <Row>{dataModal?.trip.day} day {dataModal?.trip.night} night</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                            
                            <Image src={"http://localhost:5000/uploads/"+dataModal?.attachment} style={{width: "10rem", height:"10rem"}}/>
                        
                    </Col>
                </Row>



                </Container>
                
                

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
                            <td>{dataModal?.user.fullname}</td>
                            <td>{dataModal?.user.gender}</td>
                            <td>{dataModal?.user.phone}</td>
                            <td></td>
                            <td>: {dataModal?.qty}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td className="text-danger">{converToRupiah(dataModal?.total)}</td>
                        </tr>
    
                    </tbody>
                 
                </Table>
                </Container>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="danger"
            onClick={()=> {action("Cancel")}}>
            Cancel
          </Button>
          <Button variant="success"
          onClick={() => {
            action("Approved")
          }
              
          }>
            Approve
          </Button>
        </Modal.Footer>
    
    

        
      </Modal>
        </>
    )
}

export default TransationTable

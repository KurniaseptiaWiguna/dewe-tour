import {useState, useContext, useEffect} from 'react';
import { useParams,useHistory} from 'react-router-dom';
import { BsFillCloudArrowUpFill,BsFillCloudCheckFill } from "react-icons/bs";
import {Row,Col,Modal,Button,Table, Container,Image} from 'react-bootstrap';
import {AppContext} from '../../contexts/AppContext';
import { converToRupiah } from '../../assets/Currency';
import {useQuery} from 'react-query';
import {API} from '../../config/api'
import moment from 'moment';
function PaymentCard() {
    const [data, setData] = useState();
    let {data: paymentData,refetch} = useQuery("paymentChache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },

        };
        const response = await api.get(`/transaction/${params.id}`, config);
        setData(response.data)
        return response.data;
    });
    const [form, setForm] = useState(
        {
            status: "Waiting Approve",
            attachment: ""
        }
    );
    const [previmage, setprevimage] = useState(null);
    const [state,dispatch]= useContext(AppContext);
    const api = API();
    const params = useParams();
    const [show, setShow] = useState(false);
    const handleOpen = () => { setShow(true)}
    const handleClose = () => { setShow(false)}

    
    console.log(paymentData)
    const getStatus = () => {
        switch(data?.status){
            case "Waiting Approve":
                return <div className="px-2 text-warning fw-bold" style={{color:"yellow"}}>{data?.status}</div>;
            case "Waiting Payment":
                return <div className="px-2 text-danger fw-bold" style={{color: "red"}}>{data?.status}</div>;
            case "Cancel":
                return <div className="px-2 text-danger fw-bold" style={{color: "red"}}>{data?.status}</div>;
            case "Approved":
                return <div className="px-2 text-success fw-bold" style={{color: "green"}}>{data?.status}</div>;
            
            
        }
    }
    useEffect(() => {
        console.log(form)
        refetch();
    }, [])
    useEffect(() => {
        console.log(form)
    }, [form])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value
        })
        if (e.target.name === "attachment") {
            let url = URL.createObjectURL(e.target.files[0]);
            console.log(e.target.files[0].name)
            setprevimage(url);
          }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.set("status", form.status)
            formData.set("attachment", form.attachment[0], form.attachment[0].name)
            console.log("foto",form.attachment[0].name)

            const config = {
                method: "PATCH",
                headers: {
                    "Authorization": "Basic " + localStorage.token,
                },
                body: formData,

            };
            const response = await api.patch(`payment/${params.id}`,config)
            if(response.status == "success"){
                handleOpen();
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <> 
        {paymentData ?
            <>
            <Modal.Dialog size="xl" bg="dark" key={data?.id}>
            <Modal.Body className="p-3">
                <Container>
                <Row>
                    <Col><img src={require("../../assets/img/Icon2.png").default} height="50px"/></Col>
                    <Col md="auto" className="text-right float-right">
                        <Row>
                            <h2 className='text-center'>Booking</h2>
                        </Row>
                        <Row>
                            <h5 className="text-secondary">{moment(data?.bookingDate).format("llll")}</h5>
                        </Row>
                    </Col>
                </Row>
                
                <>
                <Row>
                    <Col className="ml-4">
                        <Row ><h3 >{data?.trip.title}</h3></Row>
                        <Row><p>{data?.trip.country.name}</p></Row>
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
                                <Row>{moment(data?.dateTrip).format("llll")}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Accomodation</Row>
                                <Row>{data?.trip.accomodation}</Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="my-1"> 
                                <Row>Transportation</Row>
                                <Row>{data?.trip.transportation}</Row>
                            </Col>
                            <Col className="my-1">
                                <Row>Duration</Row>
                                <Row>{data?.trip.day} day {data?.trip.night} night</Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2} className='mr-4'>
                        { previmage === null ? (
                            <label style={{width:"10rem", marginRight:"30px", cursor: "pointer"}}>
                                <BsFillCloudArrowUpFill size={64} className='text-center'/>
                                <input type="file" name="attachment" onChange={handleChange} multiple hidden/>

                            </label>
                        ):(
                            <img src={previmage} style={{width: "10rem", height: "10rem"}}/>
                        )}
                        
                        <p className="text-center" style={{fontSize: "14px"}}>upload payment proof</p>
                    </Col>
                </Row>
                </>
                
                <Table style={{marginTop: "20px"}}>
                
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
                            <td>{data?.user.fullname}</td>
                            <td>{data?.user.gender}</td>
                            <td>{data?.user.phone}</td>
                            <td>Qty</td>
                            <td>:{data?.qty}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td className="text-danger">{converToRupiah(data?.total)}</td>
                        </tr>
    
                    </tbody>
                    
                   
                </Table>
                </Container>
            </Modal.Body>

            
            </Modal.Dialog>
            <Button variant="warning text-light" className="float-right px-5" size="lg" onClick={handleSubmit}>Pay</Button>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <p>Your payment will be confirmed within 1 x 24 hours To see orders click Here thank you</p>
            </Modal>
            </>
            
            : null
        }
        
    </>
    )
    
}

export default PaymentCard

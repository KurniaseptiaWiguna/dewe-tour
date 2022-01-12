import {useState,useEffect,useContext} from 'react';
import {Container,Row,Col,Button, Modal} from 'react-bootstrap';
import {converToRupiah} from '../../assets/Currency';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import {API} from '../../config/api'
function Price({id, idTrip,price,dateTrip}) {
    const api = API();
    const format = date => date.toISOString().slice(0, 10);

    let bookingDate = format(new Date());
    const [display, setDisplay] = useState(0)
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(1);
    const [state, dispatch]= useContext(AppContext)
    const route = useHistory();

    const [show, setShow] = useState(false);
    const handleOpen = () => { setShow(true)}
    const handleClose = () => { setShow(false)}
    function getData() {
        setTotal(count * price)
    }
    
    useEffect(() => {
        console.log(id)
        console.log(price)
        getData()

    }, [])
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
       setTotal(count * price)
       setDisplay(total)
    }, [count])

    function decrease(){
        if(count > 1){
            setCount(count - 1)
            
        }
    }
    function increase(){
        setCount(count + 1);
    }
    
    
    async function handleOnSubmit(e){
        e.preventDefault();
        const form = {
            
            idTrip : idTrip,
            dateTrip: dateTrip,
            qty: count,

        }
        try{
            const body = JSON.stringify(form)
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Basic " + localStorage.token,
                },
                body: body
            };
            console.log(body)
            const response = await api.post("/transaction", config);
            console.log(response)
            route.push(`/payment/${response.data.id}`)
            // route.push(`/payment/${response.data.id}`)
        }catch(e){
            console.log(e)
        }
    }
    
    return (
        <> 
        <Container className="mb-4" key={id}>
            <Row>
                <Col><h5 className="font-weight-bold"><span className="text-warning">{id}{converToRupiah(price)}</span> / Person</h5></Col>
                <Col md="auto">
                    <Row>
                        <div className="mx-2">
                        <Button variant="warning text-light py-1 px-auto mx-2 rounded-circle" onClick={decrease}>-</Button>
                            {count}
                        <Button variant="warning text-light py-1 mx-2 rounded-circle" onClick={increase}>+</Button>
                        </div>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col><h3 className="font-weight-bold">Total :</h3></Col>
                <Col md="auto"><h3 className="text-warning font-weight-bold">{converToRupiah(total)}</h3></Col>
            </Row>
            <hr />
            <div className="d-flex flex-row-reverse">
                <Button variant="warning" className="text-light mb-4" onClick={handleOnSubmit}>Book now</Button>
            </div>
            
            </Container>
            <Modal show={show} onHide={handleClose}>
                <h2>Your payment will be confirmed within 1 x 24 hours To see orders click Here thank you</h2>
            </Modal>
        </>
    )
}

export default Price

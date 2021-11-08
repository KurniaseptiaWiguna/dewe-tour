import {useState,useEffect,useContext} from 'react';
import {Row,Col,Button, Container} from 'react-bootstrap';
import {converToRupiah} from '../../assets/Currency';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
function Price(props) {
    const idTrip = props.idTrip;
    const dateTrip = props.dateTrip;
    const format = date => date.toISOString().slice(0, 10);

    let bookingDate = format(new Date());
    const [total, setTotal] = useState();
    const [count, setCount] = useState(1);
    const [state, dispatch]= useContext(AppContext)

    const route = useHistory();
    const calculateTotal = () => {
        let calculate = count * props.price;
        console.log(calculate);
        return calculate;
    }
    

    useEffect(() => {
        setTotal(calculateTotal());
        
    }, [count])

    function decrease(){
        if(count > 1){
            setCount(count - 1)
            
        }
    }
    function increase(){
        setCount(count + 1);
    }
    
    
    function handleOnSubmit(e){
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('Transactions'))
        const newId = data.length +1;
        
        console.log(newId)
    // 
        const newData = {
            id : newId,
            idUser : state.user.id,
            idTrip : idTrip,
            dateTrip: dateTrip,
            bookingDate : bookingDate,
            qty: count,
            total: total,
            status: "Waiting payment",
            attactment: null

        }
        
        try{
            data.push(newData)
               console.log(data)
            localStorage.setItem("Transactions", JSON.stringify(data))
                        // idTrip,
                        // dateTrip,
                        // bookingDate,
                        //count = qty
                        // count,
                        // total,
            
            route.push(`/payment/${newId}/${idTrip}`)
        }catch(e){
            console.log(e)
        }
    }
    
    return (
        <> 
        <Container className="mb-4">
            <Row>
                <Col><h5 className="font-weight-bold"><span className="text-warning">{converToRupiah(props.price)}</span> / Person</h5></Col>
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
        </>
    )
}

export default Price

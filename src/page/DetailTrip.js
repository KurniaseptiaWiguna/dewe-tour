import {useState,useContext,useEffect} from 'react';
import {Button, Container,Row,Col,Image,Modal,} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import Content from '../component/detailTour/Content';
import NavigationBar from '../component/Navbar/navbar2';
import Footer from '../component/footer';
import {converToRupiah} from '../assets/Currency';


import {useQuery} from 'react-query';
import { API } from '../config/api';
import { AppContext } from '../contexts/AppContext';
function DetailTrip() {
    const route = useHistory()
    const [state,dispatch]=useContext(AppContext);
    const [displayPhoto, setDisplayPhoto] = useState();
    const [total, setTotal] = useState();
    const [count, setCount] = useState(1)
    const api = API();
    const params = useParams();
    
    let {data: detailTripData,refetch} = useQuery("collectionChache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },

        };
        const response = await api.get(`trip/${params.id}`, config);
        setTotal(response.data.price)
        return response.data;
    });
    
    const checkUser = async () => {
        try {
          const config = {
                  method: "GET",
                  headers: {
                    Authorization: "Basic " + localStorage.token,
                  },
                };
          const response = await api.get("/checkAuth", config);
          if(response.status == "success"){
            dispatch({
              type: "USER_SUCCESS",
              payload: response.data.user,
                  });
          }
          const status = response.data.user.status;
          
          
        } catch (error) {
          
        }
      }
    async function handleOnSubmit(e){
        e.preventDefault();
        const form = {
            
            idTrip : detailTripData?.id,
            dateTrip: detailTripData?.id,
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
    function decrease(){
        if(count > 1){
            setCount(count - 1)
            
        }
    }
    function increase(){
        setCount(count + 1);
    }

    
    useEffect(() => {
        setTimeout(() => dispatch({
            type: 'HIDE_LOADING'
        }),1000);
        checkUser();
        refetch()
    }, [])

    useEffect(() => {
        setTotal(count * detailTripData?.price)
        
    }, [count])
    

    // }, [])
    return (
        <>
            <div className="cover-page">
            <NavigationBar/>
            <Container className="pt-1 my-3">
                {/* {detailTripData?.map(detailTripData =>( */}
                     <>
                     <h1 className="text-left font-weight-bolder">{detailTripData?.title}</h1>
                     <p className="text-secondary font-weight-bold">{detailTripData?.country}</p>
                     <Image src={detailTripData?.photos[0]} style={{width:"70rem",height:"24rem",objectFit:'cover'}} rounded/>
            <Row>
                <Col>
                    <Image src={detailTripData?.photos[1]} alt="photo" className='detailphotos' rounded/>
                </Col>
                <Col>
                    <Image src={detailTripData?.photos[2]} alt="photo" className='detailphotos' rounded/>
                </Col>
                <Col>
                    <Image src={detailTripData?.photos[3]} alt="photo" className='detailphotos' rounded/>
                </Col>
            </Row>
              
        <Container className="mb-4" key={detailTripData?.id}>
            <Row>
                <Col><h5 className="font-weight-bold"><span className="text-warning">{detailTripData?.price}</span> / Person</h5></Col>
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
            </Container>
            </div>
            <Footer/>
            
        </>
    )
}

export default DetailTrip

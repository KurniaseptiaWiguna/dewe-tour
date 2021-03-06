import {useContext} from 'react';
import {Container,Row,Col,Card,NavLink} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { converToRupiah } from '../../assets/Currency';

import { AppContext } from '../../contexts/AppContext';

import { useQuery } from "react-query";

// API config
import { API } from "../../config/api";
function TripCard({data,index}) {
    const url = "http://localhost:5000/uploads/"
    let api = API();
    const title = "Tour";
  document.title = "Dewe | " + title;
  
    // Fetching product data from database



    // const TripsData = JSON.parse(localStorage.getItem("Trips"))
    const isLogin = localStorage.getItem("token");

    const [state, dispatch]=useContext(AppContext)
    const route = useHistory();
   
    return (
        <>
            <Col key={index}>
                            <Card className="trip-card my-4 p-3" style={{width:"20rem",height:"20rem"}}
                                 onClick={()=>{if(isLogin){const url = `detail-trip/${data.id}`;return route.push(`detail-trip/${index}`)}else{return dispatch({type: 'SHOW_LOGIN'});}}}
                                 >
                                
                                    <img src={url+data.photo[0]} className="mx-auto mb-4" style={{width:"18rem",height:"18rem"}} position="center"/>
                                    <Row className="mx-1">
                                    <p className="text-dark font-weight-bold text-left text-truncate">{data.title}</p>
                                    </Row>
                                    
                                    <Row>
                                    
                                        <Col><p className="font-weight-bold text-warning p-0 text-left">{converToRupiah(data.price)}</p></Col>
                                        <Col><p className="font-weight-bold text-secondary p-0 text-right">{data.country.name}</p></Col>
                                       
                                    </Row>
                                    
                                </Card>
                        </Col>
         </>
    )
}

export default TripCard

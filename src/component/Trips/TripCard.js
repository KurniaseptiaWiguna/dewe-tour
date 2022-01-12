import {useContext} from 'react';
import {Container,Row,Col,Card,NavLink} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { converToRupiah } from '../../assets/Currency';

import { AppContext } from '../../contexts/AppContext';

import { useQuery } from "react-query";

// API config
import { API } from "../../config/api";
function TripCard({data,index}) {
    let api = API();
    const url = "http://localhost:5000/uploads/"
    const title = "Tour";
  document.title = "Dewe | " + title;
  
    // Fetching product data from database
  let { data: trips, refetch } = useQuery("tripsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/trips-transaction", config);
    return response.data;
  });
  console.log(trips)


    // const TripsData = JSON.parse(localStorage.getItem("Trips"))

    const [state, dispatch]=useContext(AppContext)
    console.log(state.user)
    const route = useHistory();
    // function onClickTrip(){
    //     trips?.map(data=>{
    //         if(){
    //             const url = `detail-trip/${data.id}`;
    //             return route.push(url)
    //         }
    //         else{
    //             dispatch({type: 'HIDE_LOGIN'});
    //         }
    //     })
        
    // }
    return (
        <Container>
            <Row>
                {
                    trips?.map(item => 
                        // <h1>{item.title}</h1>
                        <Col>
                            <Card className="trip-card my-4 p-3" style={{width:"20rem",height:"20rem"}}
                                 onClick={()=>{if(state.isLogin == true){return route.push(`/detail-trip/${item.id}`)}else{return dispatch({type: 'SHOW_LOGIN'});}}}
                                 >
                                
                                    <img src={url+item.photo[0]} className="mx-auto mb-4" style={{width:"18rem",height:"18rem"}} position="center"/>
                                    <Row className="mx-1">
                                    <p className="text-dark font-weight-bold text-left text-truncate">{item.title}</p>
                                    </Row>
                                    
                                    <Row>
                                    
                                        <Col><p className="font-weight-bold text-warning p-0 text-left">{converToRupiah(item.sum)}</p></Col>
                                        <Col><p className="font-weight-bold text-secondary p-0 text-right">{item.country.name}</p></Col>
                                       
                                    </Row>
                                    
                                </Card>
                        </Col>
                    )
                }
                
                
                                
            </Row>
         </Container>
    )
}

export default TripCard

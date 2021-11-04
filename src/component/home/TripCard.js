import {useContext} from 'react';
import {Container,Row,Col,Card,NavLink} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { converToRupiah } from '../../assets/Currency';

import { AppContext } from '../../contexts/AppContext';
function TripCard() {
    const TripsData = JSON.parse(localStorage.getItem("Trips"))
    const isLogin = JSON.parse(localStorage.getItem("user"));

    const [state, dispatch]=useContext(AppContext)
    const route = useHistory();
    function onClickTrip(){
        TripsData.map((data)=>{
            if(isLogin){
                const url = `detail-trip/${data.id}`;
                return route.push(url)
            }
            else{
                dispatch({type: 'HIDE_LOGIN'});
            }
        })
        
    }
    return (
        <Container>
            <Row>
                {
                TripsData.map(data => {
                    return(
                        <>
                            <Col>
                                
                                <Card className="trip-card my-4 p-3" style={{width:"20rem",height:"20rem"}} onClick={()=>{if(isLogin){const url = `detail-trip/${data.id}`;return route.push(url)}else{return dispatch({type: 'SHOW_LOGIN'});}}}>
                                
                                    <img src={require(`../../assets/img/${data.photo}`).default} className="mx-auto mb-4" style={{width:"18rem",height:"18rem"}} position="center"/>
                                    <Row className="mx-1">
                                    <p className="text-dark font-weight-bold text-left text-truncate">{data.title}</p>
                                    </Row>
                                    
                                    <Row>
                                    
                                        <Col><p className="font-weight-bold text-warning p-0 text-left">{converToRupiah(data.price)}</p></Col>
                                        <Col><p className="font-weight-bold text-secondary p-0 text-right">{data.country}</p></Col>
                                       
                                    </Row>
                                    
                                </Card>
                                
                            </Col>
                        </>
                    )
                })
                }
            </Row>
        </Container>
    )
}

export default TripCard

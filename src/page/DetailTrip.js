import {useContext,useEffect} from 'react';
import {Button, Container} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import Content from '../component/detailTour/Content';
import Header from '../component/detailTour/Header';
import Price from '../component/detailTour/Price';
import NavigationBar from '../component/Navbar/navbar2';
import Footer from '../component/footer';
import { AppContext } from '../contexts/AppContext';
function DetailTrip() {
    const [state,dispatch]=useContext(AppContext);
    const trips = JSON.parse(localStorage.getItem("Trips"));
    const params = useParams();
    const data = trips.filter((filter) => filter.id == params.id);
    
    useEffect(() => {
       dispatch({type:'AUTH'});
    }, [])
    return (
        <>
            <NavigationBar/>
            <Container className="pt-5 my-4">
            {data.map(item => {
                return (
                    <>
                    <h1 className="text-left font-weight-bolder">{item.title}</h1>
                    <p className="text-secondary font-weight-bold">{item.country}</p>
                    <Header />
                    <Content accommodation={item.accommodation} transportation={item.transportation} eat={item.eat} day={item.day} night={item.night} dateTrip={item.dateTrip} description={item.description} />
                    <Price idTrip= {item.id} dateTrip={item.dateTrip} price={item.price}/>
                    </>
                    )
            })}
            
            </Container>
            <he></he>
            <Footer/>
        </>
    )
}

export default DetailTrip

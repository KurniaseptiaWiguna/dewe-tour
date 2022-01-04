import {useState,useContext,useEffect} from 'react';
import {Button, Container,Row,Col,Image} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import Content from '../component/detailTour/Content';
import Price from '../component/detailTour/Price';
import NavigationBar from '../component/Navbar/navbar2';
import Footer from '../component/footer';
import Loading from '../component/Loading';

import {useQuery} from 'react-query';
import { API } from '../config/api';
import { AppContext } from '../contexts/AppContext';
function DetailTrip() {
    const [state,dispatch]=useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [displayPhoto, setDisplayPhoto] = useState();
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
        
        return response.data;
    });
    console.log(detailTripData)
    console.log(detailTripData?.photos[0])
    
    useEffect(() => {
       dispatch({type:'AUTH'});
       setDisplayPhoto(detailTripData?.photo)
       setTimeout(() => setLoading(false), 1000)
    }, [])
    useEffect(() => {
        refetch()
        setDisplayPhoto(detailTripData?.photo)
    }, [])
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
                     {/* <Header photo ={displayPhoto} /> */}
                     <Content accommodation={detailTripData?.accomodation} transportation={detailTripData?.transportation} eat={detailTripData?.eat} day={detailTripData?.day} night={detailTripData?.night} dateTrip={detailTripData?.dateTrip} description={detailTripData?.description} />
                     <Price idTrip= {detailTripData?.id} dateTrip={detailTripData?.dateTrip} price={detailTripData?.price}/>
                     </>
                     {/* ))} */}
            {/* {detailTripData?.map(detailTripData => {
                return (
                    <>
                    <h1 className="text-left font-weight-bolder">{detailTripData.title}</h1>
                    <p className="text-secondary font-weight-bold">{detailTripData.country}</p>
                    <Header />
                    <Content accommodation={detailTripData.accommodation} transportation={detailTripData.transportation} eat={detailTripData.eat} day={detailTripData.day} night={detailTripData.night} dateTrip={detailTripData.dateTrip} description={detailTripData.description} />
                    <Price idTrip= {detailTripData.id} dateTrip={detailTripData.dateTrip} price={detailTripData.price}/>
                    </>
                    )
            })} */}
            
            </Container>
            </div>
            <Footer/>
        </>
    )
}

export default DetailTrip

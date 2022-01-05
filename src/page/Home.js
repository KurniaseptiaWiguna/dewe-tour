import { useState,useContext,useEffect } from "react"
import { API } from "../config/api"
import { Container,Row,Col} from "react-bootstrap"
import NavigationBar from "../component/Navbar/navbar1"
import ContentCard from "../component/home/contentCard"
import Header from "../component/home/Header"
import TripCard from "../component/home/TripCard"
import Footer from "../component/footer"
import { AppContext } from "../contexts/AppContext"

import { useQuery } from "react-query"

// API config
export default function Home(){

    document.title = "Dewe | Tour";
    const [data, setData] = useState()
    const [search, setSearch] = useState("");
    const child = useState({
        word: "",
    });

    const [state,dispatch] = useContext(AppContext);
    const api = API();
    const getTrips =async () => {
        try {
            const config = {
                method: "GET",
                    headers: {
                        Authorization: "Basic " + localStorage.token,
                    },
            };
            const response = await api.get("/trips", config)
            
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    
    const searchTrip = async () => {
        try {
            const config = {
                method: "GET",
                    headers: {
                        Authorization: "Basic " + localStorage.token,
                    },
            };
            const response = await api.get(`/search/${search}`,config)
            setData(response.data)
            const elemnt = document.getElementById("trips");
            elemnt.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        } catch (error) {
            console.log(error)
        }
    }
    const reset = async () => {
        if(search == ""){
            getTrips();
        }
    }
    useEffect(() => {
        getTrips();
    }, [])
    useEffect(() => {
       console.log(data)
    }, [data])
    useEffect(() => {
        reset()
        searchTrip()
        console.log(search)
    }, [search])
    return(
        <>
        <div className="cover-page">
        <header>
            <div id="home-header">
                <div className="layer">
                    <NavigationBar state={state} dispatch={dispatch}/>
                    <Header word={w => setSearch(w)}/>
                </div>
            </div>
        </header>
        <Container className="overlapping-card">
            <Row md={4}>
                <Col>
                    <ContentCard  image="content.png" title="Best Price Guarantee" text="A small river named Duren flows by teir place and supplies" />
                </Col>
                <Col>
                    <ContentCard  image="heart.png" title="Travellers Love Us" text="A small river named Duren flows by teir place and supplies" />
                </Col>
                <Col>
                    <ContentCard  image="travel.png" title="Best Travel Agent" text="A small river named Duren flows by teir place and supplies" />
                </Col>
                <Col>
                    <ContentCard  image="operator.png" title="Our Dedicated Support" text="A small river named Duren flows by teir place and supplies" />
                </Col>
            </Row> 
        </Container>
            
        
        <Container id="trips">
            <h1 className="text-center my-5">Group Tour</h1>
            {data?.length > 0 ? 
                <Row>
                    {data?.map(item => 
                        <TripCard data={item} index={item.id} />
                        )}
                </Row>
                : <h2 className="text-center">No data found</h2>
            }
        </Container>                
        
        </div>
        <Footer/>
        
        </>
    )
}
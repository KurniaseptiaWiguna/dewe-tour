import { Container,Row,Col} from "react-bootstrap"
import NavigationBar from "../component/Navbar/navbar1"
import ContentCard from "../component/home/contentCard"
import Header from "../component/home/header"
import TripCard from "../component/home/TripCard"
import Footer from "../component/footer"
import { AppContext } from "../contexts/AppContext"
import { useContext } from "react"

// API config
export default function Home(){
    const title = "Tour";
  document.title = "Dewe | " + title;
    const [state,dispatch] = useContext(AppContext);
    console.log(state)
    return(
        <>
        <div className="cover-page">
        <header>
            <div id="home-header">
                <div className="layer">
                    <NavigationBar state={state} dispatch={dispatch}/>
                    <Header/>
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
            <h1 className="text-center my-5">Group Tour</h1>
        <Row>
                            <TripCard  />
                        
            
            
        </Row>
        
        <Container>

        </Container>
        </div>
        <Footer/>
        
        </>
    )
}
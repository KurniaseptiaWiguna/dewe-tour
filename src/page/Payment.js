import {Container,Row,Col} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import PaymentCard from '../component/payment/PaymentCard';
import Footer from '../component/footer';

function Payment() {
    return (
        <>
          <div className="cover-page">
          <NavigationBar />
          <Container className="mx-auto my-4">
            <Row>
              <Col className="align-items-center"><PaymentCard /></Col>
            </Row>
                        
          </Container>
          </div>
          <Footer />  
        </>
    )
}

export default Payment

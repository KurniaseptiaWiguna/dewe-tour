import {useState,useEffect} from 'react';
import {Container,Row,Col,Card,Button,Image} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import PaymentCard from '../component/payment/PaymentCard';
import Footer from '../component/footer';

function Payment() {
    return (
        <>
          <NavigationBar />
          <Container className="mx-auto my-4">
            <Row>
              <Col className="align-items-center"><PaymentCard /></Col>
            </Row>
                        
          </Container>
          <Footer />  
        </>
    )
}

export default Payment

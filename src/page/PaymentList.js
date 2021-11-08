import {useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import Payments from '../component/payment/Payments';
import Footer from '../component/footer';

function PaymentList() {
    return (
        <>
          <NavigationBar />
          <Container className="mx-auto my-4">
            <Row>
              <Col className="align-items-center"><Payments /></Col>
            </Row>
                        
          </Container>
          <Footer />  
        </>
    )
}

export default PaymentList

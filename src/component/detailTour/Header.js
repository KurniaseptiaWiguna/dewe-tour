import {Container,Row,Col, Image} from 'react-bootstrap';
function Header(props) {
    return (
        
        <>
            
            <Image src={require(`../../assets/img/Rectangle 8.png`).default} style={{width:"70rem",height:"24rem",objectFit:'cover'}} rounded/>
            
                
            
            {/* <Row>
                <Col>
                    <Image/>
                </Col>
                <Col>
                    <Image/>
                </Col>
                <Col>
                    <Image />
                </Col>
            </Row> */}
        </>   
        
    )
}

export default Header

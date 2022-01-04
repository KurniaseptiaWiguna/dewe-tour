import { useState, useEffect } from 'react';
import {Container,Row,Col, Image} from 'react-bootstrap';
function Header(props) {
    const [photo, setPhoto] = useState([]);
     let getData = async () => {
         let photos = await props.photo
        setPhoto(photos)
    }
    
    useEffect(() => {
        getData();
        console.log(props.photo)
    }, [])
    return (
        
        <>
            {
               photo.length > 1 ? <>
                    <Image src={photo[0]} style={{width:"70rem",height:"24rem",objectFit:'cover'}} rounded/>
            <Row>
                <Col>
                    <Image src={photo[1]} alt="photo" className='detailphotos' rounded/>
                </Col>
                <Col>
                    <Image src={photo[2]} alt="photo" className='detailphotos' rounded/>
                </Col>
                <Col>
                    <Image src={photo[3]} alt="photo" className='detailphotos' rounded/>
                </Col>
            </Row>
                </>:null
            }
            
            {/* require(`../../assets/img/Rectangle 8.png`).default */}
                
            
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

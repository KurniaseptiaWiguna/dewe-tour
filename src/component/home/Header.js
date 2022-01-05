import {useState} from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import {API} from '../../config/api'
function Header({word}) {
    const [data, setData] = useState("");
    const api = API();
    const handleChange = (e) => {
        setData(e.target.value);
        console.log(data)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        word(data)
    }
    return (
        <Container className="text-light text-left">
            <h1 className="font-weight-bolder mt-5 pt-4">Explore</h1>
            <h1 className="font-weight-light">your amazing city together</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>Find great places to holliday</Form.Label>
                    <div className="row">
                        <Form.Control placeholder="search" className="col rounded-0" onChange={e => setData(e.target.value)} value={data}/>
                        
                        <Button variant="warning" type="submit" className="col col-lg-2 rounded-0" >Search</Button>
                        
                    </div>
                                   
                </Form.Group> 
            </Form>
        </Container>
        
    )
}

export default Header

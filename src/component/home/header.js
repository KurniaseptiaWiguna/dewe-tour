import {Container,Row,Col,Form,Button} from 'react-bootstrap'
function header() {
    return (
        <Container className="text-light text-left">
            <h1 className="font-weight-bolder mt-5 pt-4">Explore</h1>
            <h1 className="font-weight-light">your amazing city together</h1>
            <Form>
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>Find great places to holliday</Form.Label>
                    <div className="row">
                        <Form.Control placeholder="search" className="col rounded-0"/>
                        
                        <Button variant="warning" className="col col-lg-2 rounded-0">Search</Button>
                        
                    </div>
                                   
                </Form.Group> 
            </Form>
        </Container>
        
    )
}

export default header

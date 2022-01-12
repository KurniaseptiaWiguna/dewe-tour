import {useState, useContext} from 'react'
import {useQuery} from 'react-query';
import { API } from '../config/api';
import {Container,Row,Col,Form,Modal, Button, Alert} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import Footer from '../component/footer';
import {AppContext} from '../contexts/AppContext'
import { useHistory } from 'react-router-dom';
function AddTrip() {
    const api = API();
    const route = useHistory();
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        title: "",
        idCountry: null,
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        dateTrip: "",
        price: "",
        quota: "",
        description: "",
        photo: []
    })

    let {data: country,refetch} = useQuery("literatureChache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },

        };
        const response = await api.get("/countries", config);
        
        return response.data;
    });



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value
            
        })
        console.log(form)
        if (e.target.name === "photo") {
            const target = e.target.files;
            const formarr = Array.from(target).map((file) =>
              URL.createObjectURL(file)
            );
            // setSelectedFile((previmage) => previmage.concat(formarr));
          }
    }
    const  handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const formData = new FormData();
            console.log(form?.photo)
            formData.set("title", form.title);
            formData.set("idCountry", form.idCountry);
            formData.set("accomodation", form.accomodation);
            formData.set("transportation", form.transportation);
            formData.set("eat", form.eat);
            formData.set("day", form.day);
            formData.set("night", form.night);
            formData.set("dateTrip", form.dateTrip);
            formData.set("price", form.price);
            formData.set("quota", form.quota);
            formData.set("description", form.description);
            // formData.set("photo", form?.photo, form?.photo.name)

            for (let a = 0; a < form?.photo?.length; a++) {
                formData.append("photo", form.photo[a], form.photo[a].name);
              }
              console.log(form.title)
            const config = {
                method: "POST",
                headers: {
                  Authorization: "Basic " + localStorage.token,
                },
                body: formData,
              };
            const response = await api.post("trip",config);
              if(response.status === "success"){
                route.push("/trips")
              }
              if(response.status === "failed"){
                  
                    const alert = (
                      <Alert variant='danger' className='py-1'>
                          <p>{response.message}</p>
                      </Alert>
                    )
                    setMessage(alert)
                    const elemnt = document.getElementById("top");
                    elemnt.scrollIntoView({behavior: "smooth", block: "end"});
              }
              
            
        } catch (error) {
            console.log(error)   
        }
    };
    return (
        <>
            <div className="cover-page">
            <NavigationBar />
            <Container>
                <h2 id='top'>Add Trip</h2>
                <Container className="my-4">
                    {message && message}
                    <Form className="px-3" onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title Trip</Form.Label>
                            <Form.Control className="bg-light" name="title" onChange={handleChange}   />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <select className='form-control' name="idCountry"  onChange={handleChange}>
                                <option>select country</option>
                                {
                                    country?.map(item => {
                                        console.log(item.id)
                                        return <option value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                            
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Accommodation</Form.Label>
                            <Form.Control name="accomodation" onChange={ handleChange }   required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Transportation</Form.Label>
                            <Form.Control name="transportation" onChange={handleChange }    required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Eat</Form.Label>
                            <Form.Control name="eat" onChange={handleChange }  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Row>
                                <Col>
                                <Row>
                                    <Col><Form.Control name="day" onChange={handleChange}  required/></Col>
                                    <Col><Form.Label>Day</Form.Label></Col>
                                    </Row>
                                </Col>
                                <Col>
                                <Row>
                                    <Col><Form.Control name="night" onChange={ handleChange }  required/></Col>
                                    <Col><Form.Label>Night</Form.Label></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date Trip</Form.Label>
                            <Form.Control name="dateTrip" onChange={handleChange}   required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="number" onChange={handleChange }   required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quota</Form.Label>
                            <Form.Control name="quota" onChange={ handleChange }   required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as ="textarea" rows={3} onChange={ handleChange }  required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Photos</Form.Label>
                            <Form.Control name="photo" type="file" multiple size="lg" rows={3} onChange={ handleChange}  required/>
                        </Form.Group>
                        <div className='text-center'>
                            <Button type="submit" variant="warning" style={{width: "300"}}>Add Trip</Button>
                        </div>
                        
                    </Form>
                </Container>
            </Container>
            </div>
            <Footer/>
            
        </>
    )
}

export default AddTrip

import {useContext,useState,useEffect} from 'react'
import { Container, Row, Col, Modal, Button,Image, Form} from 'react-bootstrap'
import {AppContext} from '../../contexts/AppContext';
import {IoPersonCircleSharp} from 'react-icons/io5';
import {MdEmail,MdPhone,MdLocationPin} from 'react-icons/md';
import {BsFillCloudArrowUpFill,BsGenderAmbiguous} from 'react-icons/bs'
import {useQuery} from 'react-query';

import {API} from '../../config/api'
function ProfileCard() {
    
    const [state, dispatch] = useContext(AppContext)
    const [user, setUser] = useState();
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        gender: "",
        phone:"",
        address:"",
        photo:null
    });
    const [newForm, setNewForm] = useState({});
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [previmage, setprevimage] = useState(null);
    const handleOpen = () => {setShow(true);}
    const handleClose = () => {setShow(false)}
    let api = API();
    document.title = "Profile";
    

    // let {data: user , refetch} = useQuery("userCache", async () => {
    //     const config = {
    //         method: "GET",
    //         headers: {
    //           Authorization: "Basic " + localStorage.token,
    //         },
    //       };
    //     const response = await api.get("user", config);
    //     if(response.status === "failed") {
    //         return dispatch({
    //             type: "AUTH_ERROR",
    //         })
    //     }
    //     setForm(response.data);
    //     return response.data;
    // })
    const getProfile =async () => {
        const config = {
            method: "GET",
            headers: {
            Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await api.get("user", config);
        if(response.status === "failed") {
            return dispatch({
            type: "AUTH_ERROR",
            })
        }
        setUser(response.data)
        setForm(response.data)
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value
        })
        
         
        
        if (e.target.name === "photo") {
            if(photo == null){
                setPhoto(
                    e.target.files
                 );
             }
            let url = URL.createObjectURL(e.target.files[0]);
            console.log(e.target.files[0].name)
            setprevimage(url);
          }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(photo)
            const formData = new FormData();
            formData.set("fullname", form.fullname)
            formData.set("email", form.email)
            formData.set("phone", form.phone)
            formData.set("gender", form.gender)
            formData.set("address", form.address)
            if(photo != null){
                formData.set("photo", photo[0], photo[0]?.name)
            }
            

            const config = {
                method: "PATCH",
                headers: {
                    "Authorization": "Basic " + localStorage.token,
                },
                body: formData,

            }
            const response = await api.patch("/user", config)
            getProfile();
            handleClose();
            setprevimage(null)
            setPhoto(null)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProfile();
    },[])
    useEffect(() => {
       console.log(form)
    }, [form])
    return (
        <>
            <Modal.Dialog size="lg">
                <Modal.Body>
                    
                    <Row>
                        <Col>
                            <h2 className="font-weight-bold">Personal info</h2>
                            <Row>
                                <Col md="auto">
                                    <IoPersonCircleSharp size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                    <Row><h5>{user?.fullname}</h5></Row>
                                    <Row>Full name</Row>
                                </Col>    
                            </Row>
                            <Row>
                            <Col md="auto">
                                <MdEmail size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{user?.email}</h5></Row>
                                    <Row>Email</Row>
                                </Col> 
                                
                            </Row>
                            <Row>
                            <Col md="auto">
                            <MdPhone size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{user?.phone}</h5></Row>
                                    <Row>Phone</Row>
                                </Col> 
                                
                            </Row>
                            <Row>
                                <Col md="auto">
                                    <BsGenderAmbiguous size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                    <Row><h5>{user?.gender}</h5></Row>
                                    <Row>Gender</Row>
                                </Col>    
                            </Row>
                            <Row>
                            <Col md="auto">
                            <MdLocationPin size="2.5rem" color="grey"/>
                                </Col>
                                <Col>
                                <Row><h5>{user?.address}</h5></Row>
                                    <Row>Address</Row>
                                </Col> 
                                
                            </Row>    
                        </Col>
                        <Col>
                            <Container>
                                {
                                    form.photo ? <Image src={"http://localhost:5000/uploads/" + form.photo} className="float-right" style={{width: "15rem"}} rounded/> : <Image src={require(`../../assets/img/profileimg.png`).default} className="float-right" style={{width: "15rem"}} rounded/>
                                }
                            
                            <Button variant="warning" className="text-light d-grid gap-2" className="float-right my-2" style={{width: "15rem"}} block onClick={handleOpen}>
                                Edit Profile
                            </Button>
                            </Container>
                        </Col>
                        
                    </Row>
                </Modal.Body>
            </Modal.Dialog>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Body>
                <h3 className="font-weight-bolder">Edit Profile</h3>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        
                        <Form.Group>
                            <label>Fullname</label>
                            <Form.Control placeholder='Fullname' name="fullname" onChange={handleChange} defaultValue={form.fullname}/>
                        </Form.Group>
                        <Form.Group>
                            <label>E-mail</label>
                            <Form.Control placeholder='E-mail' name="email" onChange={handleChange} defaultValue={form.email}/>
                        </Form.Group>
                        <Form.Group>
                            <label>Phone number</label>
                            <Form.Control placeholder='Phone number' name="phone" onChange={handleChange} defaultValue={form.phone}/>
                        </Form.Group>
                        <Form.Group>
                            <label>Gender</label>
                            <Form.Control placeholder='Gender' name="gender" onChange={handleChange} defaultValue={form.gender}/>
                        </Form.Group>
                        <Form.Group>
                            <label>Address</label>
                            <Form.Control placeholder='Address' name="address" onChange={handleChange} defaultValue={form.address}/>
                        </Form.Group>
                        
                    
                        
                        </Col>
                        <Col>
                        { previmage === null ? (
                            <label style={{width:"10rem",margin:"auto",marginLeft: "9rem", marginTop:"9rem", cursor: "pointer"}}>
                                <BsFillCloudArrowUpFill size={64} className='text-center'/>
                                <input name="photo" type="file"  onChange={handleChange} hidden multiple/>
                             </label>
                        ):(
                            <img src={previmage} style={{width: "20rem", height: "20rem"}}/>
                        )}
                            <p className='text-center'>upload photo profile</p>
                            
                        </Col>
                    </Row>
                    <Button variant='success' className="float-right" type="submit">Update profile</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            
        </>
    )
}

export default ProfileCard

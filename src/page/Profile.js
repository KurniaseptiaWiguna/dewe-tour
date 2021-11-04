import {Container} from 'react-bootstrap';
import {useState,useEffect,useContext} from 'react';
import NavigationBar from '../component/Navbar/navbar2';
import ProfileCard from '../component/profile/ProfileCard';
import Footer from '../component/footer';
function Profile() {
    return (
        <>
            <NavigationBar/>
            <Container>
                <ProfileCard />
            </Container>
            <Footer/>
        </>
    )
}

export default Profile

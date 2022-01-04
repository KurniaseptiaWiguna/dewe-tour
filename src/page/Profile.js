import {Container} from 'react-bootstrap';
import NavigationBar from '../component/Navbar/navbar2';
import ProfileCard from '../component/profile/ProfileCard';
import Footer from '../component/footer';
import UserTransaction from '../component/profile/UserTransaction';
function Profile() {
    
    return (
        <>
            <div className="cover-page">
            <NavigationBar/>
            <Container>
                <ProfileCard />
                <UserTransaction/>
            </Container>
            </div>
            <Footer/>
        </>
    )
}

export default Profile

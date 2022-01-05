import {Row,Col,Card,Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
const ContentCard = (props) => {
    const image= props.image;
    return (
        
        <Card className="justify-content-center align-items-center text-center my-3 mx-2 p-3 shadow-lg" style={{height:"18rem",width:"14rem"}} key={props.index}>
            <img src={require(`../../assets/img/${image}`).default} className="mb-4" height="70px" width="70px" position="center"/>
            <h5 className="font-weight-bold ">{props.title}</h5>
            <p>{props.text}</p>

        </Card>
        
                
    )
}
ContentCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
}

export default ContentCard

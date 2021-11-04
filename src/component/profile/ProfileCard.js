import {useContext} from 'react'
import { Container, Row, Col, Modal, Button} from 'react-bootstrap'

function ProfileCard() {
    return (
        <>
            <Modal.Dialog>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h2>Personal info</h2>
                            <h3>Kurnia septia</h3>
                        </Col>
                        <Col></Col>
                    </Row>
                </Modal.Body>
            </Modal.Dialog>
        </>
    )
}

export default ProfileCard

import {useState,useContext} from 'react'
import {Row,Modal,Button,Spinner} from 'react-bootstrap'
import { AppContext } from '../../contexts/AppContext'

function Loading() {
    const [state, dispatch] = useContext(AppContext)
    const handleClose = () => {
        dispatch({type: 'HIDE_LOADING'})
    }
    return (
        <div>
            <Modal
        show={state.modalLoading}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        
        <Modal.Body>
        <div className='d-flex justify-content-center align-items-center ' style={{height:"150px"}}>
            <Spinner animation='border' role='status' variant='warning' />
        </div>
        <h3 className='text-center'>...Loading</h3>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default Loading

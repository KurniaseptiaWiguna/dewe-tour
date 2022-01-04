import { Spinner } from "react-bootstrap";
function Loading() {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 fixed-top'>
			<Spinner animation='border' role='status' variant='warning' />
			<span className='sr-only overide-text'>
				<h3 className='text-black ms-2'>Loading...</h3>
			</span>
		</div>
    )
}

export default Loading

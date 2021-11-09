import NavigationBar from "../component/Navbar/navbar2";
import TransationTable from "../component/transaction/TransationTable";
import Footer from "../component/footer"
import { Container } from "react-bootstrap";
function Transactions() {
    return (
        <>
        <NavigationBar/>
        <Container className="mb-5 pb-5">
            <h1 className="mt-5 mb-3">Incoming Transaction</h1>
            <TransationTable />
        
        </Container>
            <Footer/>
        
        
        </>
    )
}

export default Transactions

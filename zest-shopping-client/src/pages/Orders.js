import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { Container, Row, Alert, Col } from 'react-bootstrap';
import { UserContext } from '../App';

const Orders = () => {
    const {user: {email}} = useContext(UserContext)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8080/orders?email=${email}`)
        .then(res => setOrders(res.data))
    }, [email])

    return (
        <section className="pb-5">
            <Container>
                {
                    orders.length > 0 && 
                    <Alert variant="info" className="mt-4 mb-0 text-center">
                        {email}: Your orders
                    </Alert>
                }
                <Row>
                    {
                        orders.length === 0 ? 
                        <Alert variant="info" className="mt-3 text-center">
                            You have no orders yet.!
                        </Alert>
                        :
                        <Col md={8} className="mx-auto">
                        {
                            orders.map(({name, address, method, email , products}) => {
                                return(
                                    products.map(({price, image, _id}, index) => {
                                    return(
                                        <div key={index} className="d-flex cartBox align-items-center">
                                            <div className="cartImg">
                                                <img src={image} alt="" />
                                            </div>
                                            <div>
                                                <span className="d-block"><span className="text-primary">Order ID:</span> {_id}</span>
                                                <span className="d-block"><span className="text-primary">Name:</span> {name}</span>
                                                <span className="d-block"><span className="text-primary">Email:</span> {email}</span>
                                                <span className="d-block"><span className="text-primary">Address:</span> {address}</span>
                                                <span>Price: <span className="text-primary">$</span>{price}</span>
                                                <span className="d-block"><span className="text-primary">Payment method:</span> {method}</span>
                                            </div>
                                        </div>
                                    )
                                })
                                )
                            }) 
                        }
                        </Col>
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Orders;
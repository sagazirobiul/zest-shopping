import axios from 'axios';
import React, {useState, useContext} from 'react';
import { Col, Container, Row, Alert, Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import './Cart.css'

const Cart = () => {
    const {user: {email}} = useContext(UserContext)
    const [cartProducts, setCartProducts] = useState([])

    useState(() => {
        axios.get(`http://localhost:8080/cartProducts?email=${email}`)
        .then(res => setCartProducts(res.data))
    }, [email])

    const totalPrice = cartProducts.reduce(({price}, curr) => price + curr, [0])

    return (
        <section>
            <Container>
                <Row>
                    {
                        cartProducts.length === 0 ? 
                        <Alert variant="info" className="mt-3 text-center">
                            You have no cart products yet.!
                        </Alert>
                        :
                        <Col md={7}>
                            {
                                cartProducts.map(({title, price, image, category, quantity, _id}, index) => {
                                    return(
                                        <div key={index} className="d-flex cartBox align-items-center">
                                            <div className="cartImg">
                                                <img src={image} alt="" />
                                            </div>
                                            <div>
                                                <p className="mb-0">{title}</p>
                                                <span className="d-block">Category: <span className="text-primary">{category}</span></span>
                                                <span className="d-block">Quantity: <span className="text-primary">{quantity}</span></span>
                                                <span>Price: <span className="text-primary">$</span>{price}</span>
                                                <Button className="d-block" variant="outline-danger" size="sm">Remove to cart</Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    }
                    <Col md={5}>
                        <div className="orderBox">
                            <h5>{totalPrice}</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Cart;
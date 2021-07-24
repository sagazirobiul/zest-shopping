import axios from 'axios';
import React, {useEffect, useContext, useState} from 'react';
import { Col, Container, Row, Alert, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Cart.css'

const Cart = () => {
    const {user: {email}, cartProducts, setCartProducts} = useContext(UserContext)
    const [isUpdate, setIsUpdated] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8080/cartProducts?email=${email}`)
        .then(res => setCartProducts(res.data))
    }, [email, setCartProducts, isUpdate])

    const totalPrice = cartProducts.reduce((acc, {price}) => acc + price, 0)

    const handleCartRemove = id => {
        setIsUpdated(false)
        const loading = toast.loading('removing...Please wait!')

        axios.delete(`http://localhost:8080/removeCart/${id}`)
            .then(res => {
                toast.dismiss(loading)
                if(res){
                    setIsUpdated(true);
                    toast.success('Remove to cart successful!');
                }
                else{
                    toast.error('Something went wrong, please try again');
                }
            })
    }

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
                        <Col md={8}>
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
                                                <Button onClick={() => handleCartRemove(_id)} className="d-block" variant="outline-danger" size="sm">Remove to cart</Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    }
                    <Col md={4}>
                        {
                            cartProducts.length > 0 &&
                            <div className="orderBox">
                                <h6>Total Price: <span className="text-primary">$</span>{totalPrice}</h6>
                                <h6 className="border-bottom pb-2">Delivery Charge: <span className="text-primary">$</span>18</h6>
                                <h6>Grand Total: <span className="text-primary">$</span>{18 + totalPrice}</h6>
                                <Button as={Link} to="/orderForm" className="w-100 my-2" variant="success">Place Order</Button>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Cart;
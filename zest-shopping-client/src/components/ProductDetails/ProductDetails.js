import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1)

    const {title, image, description, category, price} = product || {};

    useEffect(() => {
        axios(`https://fakestoreapi.com/products/${id}`)
        .then(res => setProduct(res.data))
    }, [id])

    const handleQuantity = (action) => {
        if(action === 'decrease'){
            if(quantity > 1){
                setQuantity(quantity - 1)
            }
        }else {
            setQuantity(quantity + 1)
        }
    }

    return (
        <section className="py-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="cardImg">
                            <img src={image} alt="" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="d-flex justify-content-between align-items-center border p-1 rounded w-50">
                                <Button onClick={() => handleQuantity('decrease')} variant="outline-danger">-</Button>
                                <h5>{quantity}</h5>
                                <Button onClick={handleQuantity} variant="outline-success">+</Button>
                            </div>
                            <h5 className="w-50 text-center">Price: <span className="text-primary">$</span>{price * quantity}</h5>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h2>{title}</h2>
                        <h5 className="my-3">Category: <span className="text-primary">{category}</span></h5>
                        <p>{description}</p>
                        <Button>Add to cart</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetails;
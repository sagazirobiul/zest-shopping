import React from 'react';
import { Button, Col } from 'react-bootstrap';
import './Product.css'

const Product = ({data: {price, id, image}}) => {

    return (
        <Col lg={3} md={4} sm={6} className="my-3">
            <div className="productCard">
                <div className="cardImg">
                    <img src={image} alt="" />
                </div>
                <div className="py-2 d-flex justify-content-between align-items-center">
                    <h5><span className="text-primary">$</span>{price}</h5>
                    <Button variant="outline-primary">View Details</Button>
                </div>
            </div>
        </Col>
    );
};

export default Product;
import React,{ useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import toast from 'react-hot-toast';
import { UserContext } from '../../App';

const ProductDetails = () => {
    const { user: {email}} = useContext(UserContext)
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)

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

    const handleAddCart = () => {
        setIsAdding(true)
        const cartData = {
            title: title,
            image: image,
            description: description,
            category: category,
            quantity: quantity,
            price: price * quantity,
            email: email
        }

        axios.post('http://localhost:8080/addCart', cartData)
        .then(res => {
            if(res){
                setIsAdding(false)
                toast.success('Product successfully added to cart')
            }
        })
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
                        {
                            isAdding ?
                            <Button variant="primary" disabled>
                                <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                                Adding...
                            </Button>:
                            <Button onClick={handleAddCart}>Add to cart</Button>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetails;
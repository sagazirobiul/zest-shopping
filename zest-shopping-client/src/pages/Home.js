import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Product from '../components/Product/Product';

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios('https://fakestoreapi.com/products')
        .then(data => setProducts(data.data))
    }, [])
    
    return (
        <section className="py-5">
           <Container>
                <Col md={4} className="mx-auto">
                    <InputGroup className="mb-4">
                        <FormControl aria-describedby="basic-addon2"/>
                        <Button variant="primary" id="button-addon2">Search</Button>
                    </InputGroup>
                </Col>
               <Row>
                    {
                        products.map(data => <Product data={data} key={data.id}/>)
                    }
               </Row>
           </Container>
        </section>
    );
};

export default Home;
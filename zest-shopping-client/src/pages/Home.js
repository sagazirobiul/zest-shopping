import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import Product from '../components/Product/Product';

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios('https://fakestoreapi.com/products')
        .then(data => setProducts(data.data))
    }, [])
    
    return (
        <section>
           <Container>
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
import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import { Col, Container, Form } from 'react-bootstrap';
import { UserContext } from '../App';
import swal from 'sweetalert';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

const OrderForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const {user: {email, name}, cartProducts} = useContext(UserContext)
    const history = useHistory();
    
    const totalPrice = cartProducts.reduce((acc, {price}) => acc + price, 0)

    const onSubmit = ({name, email, address}) => {
        const loading = toast.loading('Please wait...');
        const orderData = {
            name: name,
            email: email,
            address: address,
            products: cartProducts,
            method: 'COD',
            totalPrice: totalPrice
        }

        axios.post('http://localhost:8080/addOrders', orderData)
        .then(res => {
            if(res){
                toast.dismiss(loading);
                swal( "Success" ,  "Your order placed successfully!" ,  "success" )
                history.push('/orders')
            }
        })
        reset();
    }

    return (
        <section>
            <Container>
                <Col md={5} className="mx-auto fromContainer">
                    <p className="formTitle"><span className="text-success">Order</span> Form</p>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={name || ""} className="form-control" placeholder="Name" {...register("name")} required/>
                        <input defaultValue={email || ""} className="form-control my-2" placeholder="Email" {...register("email")} required/>
                        <input className="form-control" placeholder="Address" {...register("address")} required/>
                        <input defaultValue={`Total Price: ${totalPrice}` || ""} className="form-control my-2" {...register("totalPrice")} disabled/>
                        <input defaultValue="Method (COD)" className="form-control" disabled/>
                        <input className="btn w-100 btn-success my-2" type="submit" />
                    </Form>
                </Col>
            </Container>
        </section>
    );
};

export default OrderForm;
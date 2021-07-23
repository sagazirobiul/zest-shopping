import React from 'react';
import { useForm } from "react-hook-form";
import { Form } from 'react-bootstrap';

const SignUpForm = () => {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
        console.log(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control mb-2" placeholder="Name" {...register("name")} required/>
            <input className="form-control" placeholder="Email" {...register("email")} required/>
            <input className="form-control my-2" type="password" placeholder="Password" {...register("password")} required/>
            <input className="btn w-100 btn-primary mb-2" type="submit" />
        </Form>
    );
};

export default SignUpForm;
import React from 'react';
import { useForm } from "react-hook-form";
import { Form } from 'react-bootstrap';
import { loginWithEmail } from '../pages/login/logInManager';
import toast from 'react-hot-toast';

const SignInForm = ({redirect, setUser}) => {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = ({email, password}) => {
        const loading = toast.loading('Please wait...');
        loginWithEmail(email, password)
        .then(res => {
            if(res.error){
                toast.error(res.error)
            } else {
                setUser(res);
                toast.success('Login successful!')
                redirect();
            }
            toast.dismiss(loading);
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control" placeholder="Email" {...register("email")} required/>
            <input className="form-control my-2" type="password" placeholder="Password" {...register("password")} required/>
            <input className="btn w-100 btn-primary mb-2" type="submit" />
        </Form>
    );
};

export default SignInForm;
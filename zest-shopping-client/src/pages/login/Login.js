import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Col, Container } from 'react-bootstrap';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';
import './Login.css'
import { loginWithProvider } from './logInManager';
import toast from 'react-hot-toast';

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const google = new firebase.auth.GoogleAuthProvider();

    const handleGoogleLogin = () => {
        const loading = toast.loading('Please wait...');
        loginWithProvider(google)
        .then(res => {
            if(res.error){
                toast.error(res.error)
            } else {
                toast.success('Login successful!')
            }
            toast.dismiss(loading);
        })
    }

    return (
        <Container>
            <Col md={5} className="mx-auto fromContainer">
                {
                    isNewUser ?
                    <>
                        <p className="formTitle">Sign Up</p>
                        <SignUpForm/>
                        <p className="userIdentity">Already have an account? <button onClick={() => setIsNewUser(false)}>Sign In</button></p>
                    </>:
                    <>
                        <p className="formTitle">Sign In</p>
                        <SignInForm/>
                        <p className="userIdentity">Create a new account? <button onClick={() => setIsNewUser(true)}>Sign Up</button></p>
                    </>
                }
                <p className="or">Or</p>
                <button onClick={handleGoogleLogin} className="googleBtn"> Sign In with google</button>
            </Col>
        </Container>
    );
};

export default Login;
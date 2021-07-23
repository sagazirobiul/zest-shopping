import React, {useContext} from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleSignOut } from '../../pages/login/logInManager';
import './NavBar.css'

const NavBar = () => {
    const { user, setUser} = useContext(UserContext)

    const signOut = () => {
        const loading = toast.loading('Please wait...');
        handleSignOut()
        .then(res => {
            toast.dismiss(loading);
            setUser(res)
            toast.error('Logged Out!');
        })
    }
    
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="navBar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold"><span className="text-primary">ZEST</span> SHOPPING</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav align-items-center">
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <NavLink exact activeClassName="activePage" to="/">Home</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink activeClassName="activePage" to="/cart">Cart</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink activeClassName="activePage" to="/orders">Orders</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                {
                                    user.isSignedIn ? 
                                    <Button onClick={signOut} variant="danger">LogOut</Button>:
                                    <NavLink activeClassName="activePage" to="/login">Login</NavLink>
                                }
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
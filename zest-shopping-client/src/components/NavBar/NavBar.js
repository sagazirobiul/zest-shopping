import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="navBar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold"><span className="text-primary">ZEST</span> SHOPPING</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
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
                                <NavLink activeClassName="activePage" to="/login">Login</NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
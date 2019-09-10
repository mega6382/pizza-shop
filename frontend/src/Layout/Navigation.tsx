import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap';
import {getUser, isLoggedIn} from "../AuthStatus";

export default class Navigation extends React.Component {
    state = {
        isLoggedIn: isLoggedIn(),
        user: getUser(),
    };

    handleChange = (event: any) => {
        this.setState({isLoggedIn: isLoggedIn()});
        this.setState({user: getUser()});
    };
    handleLogout = (event: any) => {
        this.setState({isLoggedIn: false});
        this.setState({user: undefined});
    };

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">PizzaShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/"><Nav.Link onClick={this.handleChange}>Home</Nav.Link></LinkContainer>
                    </Nav>
                    {this.state.isLoggedIn ?
                        (<Nav className="navBarRight">
                            <Navbar.Text>Logged in as: {this.state.user.name}</Navbar.Text>
                            <LinkContainer to="/user/profile">
                                <Nav.Link onClick={this.handleChange}>Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/user/orders">
                                <Nav.Link onClick={this.handleChange}>Orders</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/user/logout">
                                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                            </LinkContainer>
                        </Nav>) :
                        (<Nav className="navBarRight">
                            <LinkContainer to="/user/register">
                                <Nav.Link onClick={this.handleChange}>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/user/login">
                                <Nav.Link onClick={this.handleChange}>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>)}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
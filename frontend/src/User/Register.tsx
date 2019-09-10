import React, {CSSProperties} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Api from "../Api";
import {isLoggedIn} from "../AuthStatus";
import {Redirect} from 'react-router-dom';

export default class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        c_password: '',
        isLoggedIn: isLoggedIn(),
        redirect: false,
        error: ''
    };

    componentDidMount() {
        this.setState({isLoggedIn: isLoggedIn()});
    }

    handleChange = (event: any) => {
        const input = event.target;
        this.setState({[input.name]: input.value});
    };

    handleRegister = async (event: any) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.c_password,
        };
        const registerResponse = await Api.post(`register`, data);
        if (registerResponse.status !== 200) {
            this.setState({error: "Unable to Register. Please try again."});
            return;
        }

        localStorage.setItem('token', registerResponse.data.success.token);

        const profileResponse = await Api.get(`user`, {headers: {'Authorization': `Bearer ${registerResponse.data.success.token}`}});
        localStorage.setItem('user', JSON.stringify(profileResponse.data));
        this.setState({redirect: true});
    };

    render() {
        if (this.state.isLoggedIn || this.state.redirect) {
            return (<Redirect to="/"/>);
        }
        let ErrorAlert = () => <div/>;
        if (this.state.error.length > 0) {
            ErrorAlert = () => <Alert variant="danger">
                {this.state.error}
            </Alert>;
        }
        return (
            <div className="col-md-6 mx-auto" style={{textAlign: 'left'} as CSSProperties}>
                <h1>Register</h1>
                <ErrorAlert/>
                <Form onSubmit={this.handleRegister} method="POST">
                    <Form.Group controlId="formBasicName">
                        <Form.Label column={true}>Name </Form.Label>
                        <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Enter name"
                                      required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label column={true}>Email </Form.Label>
                        <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email"
                                      required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label column={true}>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange}
                                      placeholder="Password" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label column={true}>Confirm Password</Form.Label>
                        <Form.Control type="password" name="c_password" onChange={this.handleChange}
                                      placeholder="Password" required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
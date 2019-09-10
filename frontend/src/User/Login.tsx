import React, {CSSProperties} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Api from "../Api";
import {isLoggedIn} from "../AuthStatus";
import {Redirect} from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import * as queryString from "querystring";

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
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

    handleLogin = async (event: any) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        const loginResponse = await Api.post(`login`, data);
        if (loginResponse.status !== 200) {
            this.setState({error: "Unable to login. Please try again."});
            return;
        }
        localStorage.setItem('token', loginResponse.data.success.token);

        const profileResponse = await Api.get(`user`, {headers: {'Authorization': `Bearer ${loginResponse.data.success.token}`}});
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
        let WarningAlert = () => <div/>;
        const search = (this.props as { location: any }).location.search;
        const searchValues = new URLSearchParams(search);
        console.log((searchValues.get('message')));
        if (searchValues.get('message')) {
            WarningAlert = () => <Alert variant="warning">
                {searchValues.get('message')}
            </Alert>;
        }
        return (
            <div className="col-md-6 mx-auto" style={{textAlign: 'left'} as CSSProperties}>
                <h1>Login</h1>
                <WarningAlert/>
                <ErrorAlert/>
                <Form onSubmit={this.handleLogin} method="POST">
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
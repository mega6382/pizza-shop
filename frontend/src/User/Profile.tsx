import React, {CSSProperties} from 'react';
import Api from "../Api";
import Form from "react-bootstrap/Form";
import {getToken, isLoggedIn} from "../AuthStatus";
import {Redirect} from "react-router-dom";

export default class Profile extends React.Component {
    state = {
        user: {email: "", name: ""}
    }

    async componentDidMount() {
        const response = await Api.get(`user`, {headers: {'Authorization': `Bearer ${getToken()}`}});
        const user = response.data;
        this.setState({user});
    }

    render() {
        if (!isLoggedIn()) {
            return (<Redirect to="/"/>);
        }
        return (
            <div className="col-md-6 mx-auto" style={{textAlign: 'left'} as CSSProperties}>
                <h1>Profile</h1>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label column={true}>Name </Form.Label>
                        <Form.Control type="text" value={this.state.user.name} readOnly/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label column={true}>Email </Form.Label>
                        <Form.Control type="text" value={this.state.user.email} readOnly/>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}
import React from 'react';
import {Redirect} from 'react-router-dom';

export default class Logout extends React.Component {


    componentDidMount() {
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <Redirect to="/user/login"/>
            </div>
        );
    }
}
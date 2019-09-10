import React from 'react';
import Api from "../Api";
import Table from "react-bootstrap/Table";
import {getToken, isLoggedIn} from "../AuthStatus";
import {Redirect} from "react-router-dom";

export default class Orders extends React.Component {
    state = {
        orders: [],
    };

    async componentDidMount() {
        const response = await Api.get(`order/all`, {headers: {'Authorization': `Bearer ${getToken()}`}});
        const orders = response.data;
        this.setState({orders});
    }

    render() {
        if (!isLoggedIn()) {
            return (<Redirect to="/"/>);
        }
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Pizza</th>
                        <th>Sub Total</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map((order: any) =>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.pizza.name} Pizza</td>
                            <td>{order.sub_total_cost}</td>
                            <td>{order.tax}</td>
                            <td>{order.total_cost}</td>
                            <td>{order.status}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
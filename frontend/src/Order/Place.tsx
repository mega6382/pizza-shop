import React, {CSSProperties} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Api from "../Api";
import {Redirect, RouteProps} from 'react-router';
import {getToken, isLoggedIn} from "../AuthStatus";
import Alert from "react-bootstrap/Alert";

interface matchProps {
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    }
}

export default class PlaceOrder extends React.Component<RouteProps & matchProps> {
    state: {
        [name: string]: any
    } = {
        pizza: {id: '', name: '', price: 0},
        error: '',
        orderData: {
            pizza_id: this.props.match.params.pizza_id,
            billing_address_id: '',
            delivery_address_id: '',
        },
        billing_street_address: '',
        billing_postal_code: '',
        billing_city: '',
        billing_state: '',
        billing_country: '',

        delivery_street_address: '',
        delivery_postal_code: '',
        delivery_city: '',
        delivery_state: '',
        delivery_country: '',
        useSameAddress: false,
        orderPlaced: false
    };

    async componentDidMount() {
        const pizza_id = this.props.match.params.pizza_id;
        const pizzaResponse = await Api.get(`pizza/${pizza_id}`);
        const pizza = pizzaResponse.data[0];
        this.setState({pizza});
    }

    handleChange = (event: any) => {
        const input = event.target;
        this.state[input.name] = input.value;
    };

    processOrder = async (event: any) => {
        event.preventDefault();
        const orderData = this.state.orderData;

        const billingAddressData = {
            street_address: this.state.billing_street_address,
            postal_code: this.state.billing_postal_code,
            city: this.state.billing_city,
            state: this.state.billing_state,
            country: this.state.billing_country,
        };
        const billingAddressResponse = await Api.post(`address/add`, billingAddressData, {headers: {'Authorization': `Bearer ${getToken()}`}});
        const billingAddress = billingAddressResponse.data.success;
        orderData.billing_address_id = billingAddress.id;
        orderData.delivery_address_id = billingAddress.id;
        if (!this.state.useSameAddress) {
            const deliveryAddressData = {
                street_address: this.state.delivery_street_address,
                postal_code: this.state.delivery_postal_code,
                city: this.state.delivery_city,
                state: this.state.delivery_state,
                country: this.state.delivery_country,
            };
            const deliveryAddressResponse = await Api.post(`address/add`, deliveryAddressData, {headers: {'Authorization': `Bearer ${getToken()}`}});
            const deliveryAddress = deliveryAddressResponse.data;
            orderData.delivery_address_id = deliveryAddress.id;
        }
        const orderResponse = await Api.post(`order/add`, orderData, {headers: {'Authorization': `Bearer ${getToken()}`}});
        this.setState({orderPlaced: true});
    };

    HandleSameAddress = (event: any) => {
        const input = event.target;
        this.setState({useSameAddress: input.checked});
    };


    render() {
        if (!isLoggedIn()) {
            return (<Redirect to="/user/login?message=You must first login to place an order."/>);
        }
        const Cart = this.cart();
        const CheckoutForm = this.checkoutForm;
        return (this.state.orderPlaced ?
                <div>
                    <Alert variant="success">
                        Order Placed Successfully!
                    </Alert>
                </div>
                :
                <div className="row col-md-8 mx-auto">
                    <Cart/>
                    <CheckoutForm/>
                </div>
        );
    }

    cart() {
        const pizza = this.state.pizza;
        return () => (
            <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge badge-secondary badge-pill">1</span>
                </h4>
                <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">{pizza.name} Pizza</h6>
                        </div>
                        <span className="text-muted">${pizza.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Tax</h6>
                        </div>
                        <span className="text-muted">$0</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${pizza.price}</strong>
                    </ListGroup.Item>
                </ListGroup>
            </div>);
    }

    checkoutForm = () => {
        let ErrorAlert = () => <div/>;
        if (this.state.error.length > 0) {
            ErrorAlert = () => <Alert variant="danger">
                {this.state.error}
            </Alert>;
        }
        return (
            <div className="col-md-8 order-md-1" style={{textAlign: 'left'} as CSSProperties}>
                <h2>Checkout</h2>
                <ErrorAlert/>
                <Form onSubmit={this.processOrder}>
                    <hr className="mb-4"/>
                    <h4 className="mb-3">Billing address</h4>
                    <Form.Group controlId="BillingStreetAddress">
                        <Form.Label column={true}>Street Address </Form.Label>
                        <Form.Control type="text" name="billing_street_address" onChange={this.handleChange}
                                      placeholder="Enter address"
                                      required/>
                    </Form.Group>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="BillingPostalCode">
                                <Form.Label column={true}>Postal Code </Form.Label>
                                <Form.Control type="text" name="billing_postal_code" onChange={this.handleChange}
                                              placeholder="Enter Postal Code"
                                              required/>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="BillingCity">
                                <Form.Label column={true}>City </Form.Label>
                                <Form.Control type="text" name="billing_city" onChange={this.handleChange}
                                              placeholder="Enter City"
                                              required/>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="BillingState">
                                <Form.Label column={true}>State </Form.Label>
                                <Form.Control type="text" name="billing_state" onChange={this.handleChange}
                                              placeholder="Enter State"
                                              required/>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="BillingCountry">
                                <Form.Label column={true}>Country </Form.Label>
                                <Form.Control type="text" name="billing_country" onChange={this.handleChange}
                                              placeholder="Enter Country"
                                              required/>
                            </Form.Group>
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <Form.Group controlId="SameDelivery">
                        <Form.Check type="checkbox" name="same_delivery_as_billing" onChange={this.HandleSameAddress}
                                    checked={this.state.useSameAddress}
                                    label="Delivery address is the same as my billing address"/>
                    </Form.Group>
                    {!this.state.useSameAddress ?
                        <div>
                            <hr className="mb-4"/>
                            <h4 className="mb-3">Delivery address</h4>
                            <Form.Group controlId="DeliveryStreetAddress">
                                <Form.Label column={true}>Street Address </Form.Label>
                                <Form.Control type="text" name="delivery_street_address" onChange={this.handleChange}
                                              placeholder="Enter address"
                                              required/>
                            </Form.Group>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <Form.Group controlId="DeliveryPostalCode">
                                        <Form.Label column={true}>Postal Code </Form.Label>
                                        <Form.Control type="text" name="delivery_postal_code"
                                                      onChange={this.handleChange}
                                                      placeholder="Enter Postal Code"
                                                      required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <Form.Group controlId="DeliveryCity">
                                        <Form.Label column={true}>City </Form.Label>
                                        <Form.Control type="text" name="delivery_city" onChange={this.handleChange}
                                                      placeholder="Enter City"
                                                      required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <Form.Group controlId="DeliveryState">
                                        <Form.Label column={true}>State </Form.Label>
                                        <Form.Control type="text" name="delivery_state" onChange={this.handleChange}
                                                      placeholder="Enter State"
                                                      required/>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <Form.Group controlId="DeliveryCountry">
                                        <Form.Label column={true}>Country </Form.Label>
                                        <Form.Control type="text" name="delivery_country" onChange={this.handleChange}
                                                      placeholder="Enter Country"
                                                      required/>
                                    </Form.Group>
                                </div>
                            </div>
                        </div> :
                        <div/>}
                    <Button variant="primary" type="submit">
                        Place Order
                    </Button>
                </Form>
            </div>
        );
    }
}
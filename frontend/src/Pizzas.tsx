import React from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Api from "./Api";
import {Redirect} from "react-router-dom";
import {isLoggedIn} from "./AuthStatus";

export default class Pizzas extends React.Component {
    state = {
        pizzas: [],
        selectedPizza: 0,
        isLoggedIn: isLoggedIn(),
    }

    async componentDidMount() {
        const response = await Api.get(`pizzas`);
        const pizzas = response.data;
        this.setState({pizzas});
    }

    handleOrder(pizzaId: string) {
        return (event: any) => {
            this.setState({selectedPizza: pizzaId});
        }
    }

    render() {
        if (this.state.selectedPizza > 0) {
            const path = `/order/place/${this.state.selectedPizza}`;
            return <Redirect to={path}/>;
        }
        const search = (this.props as { location: any }).location.search;
        const searchValues = new URLSearchParams(search);
        console.log((searchValues.get('isLoggedIn')));
        if (searchValues.get('isLoggedIn')) {
            window.location.href = window.location.pathname;
        }
        return (
            <CardColumns>
                {this.state.pizzas.map((pizza: any) =>
                    <Card key={pizza.id}>
                        <Card.Img variant="top" height="300"
                                  src={pizza.picture}/>
                        <Card.Body>
                            <Card.Title>{pizza.name} Pizza</Card.Title>
                            <Card.Title>${pizza.price}</Card.Title>
                            <Card.Title>Size: {pizza.size.toUpperCase()}</Card.Title>
                            <Card.Text className="pizzaDescription">
                                {pizza.description}
                            </Card.Text>
                            <Button variant="primary" onClick={this.handleOrder(pizza.id)}>Order</Button>
                        </Card.Body>
                    </Card>
                )}
            </CardColumns>
        );
    }
}
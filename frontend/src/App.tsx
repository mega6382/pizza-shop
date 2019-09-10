import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Pizzas from "./Pizzas";
import Login from "./User/Login";
import Register from "./User/Register";
import Logout from "./User/Logout";
import Navigation from "./Layout/Navigation";
import Profile from "./User/Profile";
import Orders from "./User/Orders";
import PlaceOrder from "./Order/Place";

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <Navigation/>
                    </header>
                    <Route exact path="/" component={Pizzas}/>
                    <Route strict path="/user/login" component={Login}/>
                    <Route strict path="/user/register" component={Register}/>
                    <Route strict path="/user/logout" component={Logout}/>
                    <Route strict path="/user/profile" component={Profile}/>
                    <Route strict path="/user/orders" component={Orders}/>
                    <Route strict path="/order/place/:pizza_id" component={PlaceOrder}/>
                </Router>
            </div>
        )
    }
}
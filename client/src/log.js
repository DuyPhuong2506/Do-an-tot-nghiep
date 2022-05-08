import React from "react";
import imgs from './assets/images/logo-icon.png'
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Register from "./pages/Auth/RegisterPage";
import Login from "./pages/Auth/LoginPage";
const Log = (props) => {
    const pathName = window.location.pathname;
    return (

        <Router>
            <Switch>
                <Register path="/sign-up" component={Register} account={props.account} contractAddress={props.contractAddress} />
                <Login exact path="/" component={Login} account={props.account} />
            </Switch>
        </Router>
    );
}


export default Log;
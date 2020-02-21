import MenuAppBar from "./MenuAppBar";
import React from "react";
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import App from "./app/App";
import Manage from "./Manage";
import Practice from "./Practice";
import Register from "./Register";
import Login from "./Login";

export default function Routes() {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            isAuthenticated === true
                ? <Component {...rest} {...props} />
                : <Redirect to='/Login' />
        )} />
    );

    return (
        <BrowserRouter>
            <header>
                <MenuAppBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            </header>

            <Route exact path="/" component={App}/>
            <PrivateRoute setIsAuthenticated={setIsAuthenticated} exact path="/Manage" component={Manage}/>
            <PrivateRoute setIsAuthenticated={setIsAuthenticated} exact path="/Practice" component={Practice}/>
            <Route exact path="/Register" component={Register}/>
            <Route exact path="/Login"
                   render={(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated}/>}
            />
        </BrowserRouter>
    )
}
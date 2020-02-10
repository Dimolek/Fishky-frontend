import MenuAppBar from "./MenuAppBar";
import React from "react";
import {Route} from 'react-router-dom';
import App from "./app/App";
import Manage from "./Manage";
import Practice from "./Practice";
import Register from "./Register";
import Login from "./Login";


export default function Routes() {

    return (
        <div>
            <header>
                <MenuAppBar/>
            </header>
            <Route exact path="/" component={App}/>
            <Route exact path="/Manage" component={Manage}/>
            <Route exact path="/Practice" component={Practice}/>
            <Route exact path="/Register" component={Register}/>
            <Route exact path="/Login" component={Login}/>
        </div>
    )
}
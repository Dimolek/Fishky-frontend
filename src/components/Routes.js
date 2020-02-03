import MenuAppBar from "./MenuAppBar";
import React from "react";
import {Route} from 'react-router-dom';
import App from "./app/App";
import Manage from "./Manage";
import Practice from "./Practice";


export default function Routes() {

    return (
        <div>
            <header>
                <MenuAppBar/>
            </header>
            <Route exact path="/" component={App}/>
            <Route exact path="/Manage" component={Manage}/>
            <Route exact path="/Practice" component={Practice}/>
        </div>
    )
}
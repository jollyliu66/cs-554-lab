import React, { Component } from 'react';
import {Link} from "react-router-dom"

class MainPage extends Component{
    render(){
        return(
            <div className = "App-body">
            <h1>This is API test</h1>
            <ul>
                <li><Link to="/pokemon/page/0">Pokemon Listing</Link></li>
                <li><Link to="/berries/page/0">Berries Listing</Link></li>
                <li><Link to="/machine/page/0">Machine Listing</Link></li>
            </ul>
            </div>
        )
    }
}
export default MainPage;
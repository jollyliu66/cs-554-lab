import React,{Component} from 'react';

import{Link} from 'react-router-dom';

class NotFound extends React.Component{
    render(){
        return(
            <div className = "App-body">

            <h1>404</h1>
            <p>cannot find any data</p>
            <ul>
                    <li><Link to="/pokemon/page/0">Pokemon</Link></li>
                    <li><Link to="/berries/page/0">Berry</Link></li>
                    <li><Link to="/machine/page/0">Machine</Link></li>
            </ul>
            </div>
            
        )
    }

}
export default NotFound;
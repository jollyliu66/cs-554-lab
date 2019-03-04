import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import PokemonContainer from './components/PokemonContainer';
import NotFound from './components/NotFound';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to the API test</h1>
                  <Link className="showlink" to="/">
                     API
                  </Link>
               </header>
               
               <div className="App-body">
                  
                  <Route exact path = "/" component = {PokemonContainer} />
                  <Route path="/pokemon/page/:page/" component={PokemonContainer} />
                  <Route path="/pokemon/:id/" component={PokemonContainer} />
                  <Route path="/berries/page/:page/" component={PokemonContainer} />
                  <Route path="/berries/:id/" component={PokemonContainer} />
                  <Route path="/machine/page/:page/" component={PokemonContainer} />
                  <Route path="/machine/:id/" component={PokemonContainer} />

               </div>
            </div>
         </Router>
      );
   }
}

export default App;

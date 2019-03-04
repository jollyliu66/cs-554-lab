import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import BerriesList from './BerriesList';
import Berries from './Berries';
import MachineList from './MachineList';
import Machine from './Machine';
import MainPage from "./MainPage";
import NotFound from './NotFound';


class PokemonContainer extends Component {
   render() {
      return (
         <div>
            <Switch>
               <Route exact path = "/" component = {MainPage} />
               <Route path="/pokemon/page/:page" exact component={PokemonList} />
               <Route path="/pokemon/:id" exact component={Pokemon} />
               <Route path="/berries/page/:page" exact component={BerriesList} />
               <Route path="/berries/:id" exact component={Berries} />
               <Route path="/machine/page/:page" exact component={MachineList} />
               <Route path="/machine/:id" exact component={Machine} />
               <Route component= {NotFound} />
               
            </Switch>
         </div>
      );
   }
}

export default PokemonContainer;

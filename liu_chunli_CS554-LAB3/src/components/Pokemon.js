import React, { Component } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';

class Pokemon extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
   }
   componentWillMount() {
      this.getPokemon();
   }
   async getPokemon() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
         );
         console.log(response);
         this.setState({
            data: response.data,
            loading: false
         });
      } catch (e) {
         console.log(`error ${e}`);
      }
   }
   

   render(){
      
     
      if(this.state.data){
         const abilityArray = this.state.data.abilities.map((ability,index)=>(
             <li key = {index}>{ability.ability.name}</li>
         ));

         const game_indiceArray = this.state.data.game_indices.map((version,index)=>(
            <li key = {index}>{version.version.name}</li>
         ));
         const height = this.state.data.height;
         const weight = this.state.data.weight;
         const order = this.state.data.order;
         const id = this.state.data.order;
         const name = this.state.data.name;
         const species = this.state.data.species.name;
      
      return(
         <div>
         <ul>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>species: {species}</p>
            <ul>abilities:
            <li> {abilityArray}</li>
            </ul>
            <ul>game_indiceArray:
            <li> {game_indiceArray}</li>
            </ul>
           
            <p>height: {height}</p>
            <p>weight: {weight}</p>
            <p>order: {order}</p>
         </ul>
         
         <ul className="list-unstyled"></ul>
         </div>
      )}else{
         return <p>no data</p>
      }

   }
}



    

export default Pokemon;



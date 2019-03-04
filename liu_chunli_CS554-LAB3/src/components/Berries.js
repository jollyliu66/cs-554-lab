import React, { Component } from 'react';
import axios from 'axios';



class Berries extends Component {
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
            `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
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
         const flavor = this.state.data.flavors.map((flavor,index) =>(
            <li key = {index}>{flavor.flavor.name}</li>
         ));
         const id = this.state.data.id;
         const name = this.state.data.name;
         const item_name = this.state.data.item.name;
         const growth_time = this.state.data.growth_time;
         const max_harvest = this.state.data.max_harvest;
         const natural_gift_power = this.state.data.natural_gift_power;
        
         const size = this.state.data.size;
         const smoothness = this.state.data.smoothness;
         const soil_dryness = this.state.data.soil_dryness;


         return(
            <div>
            <p>id: {id}</p>
            <p>name: {name}</p>
            <p>item_name: {item_name}</p>
            <ul> flavors:
                <li> {flavor}</li>
            </ul>
           
            <p>growth_time: {growth_time}</p>
            <p>max_harvest: {max_harvest}</p>
            <p>natural_gift_power: {natural_gift_power}</p>
            
            <p>size: {size}</p>
            <p>smoothness: {smoothness}</p>
            <p>soil_dryness: {soil_dryness}</p>
            
            <ul className="list-unstyled">
           
            </ul>
            </div>
         );
      } else {
         return (
            <p>no data</p>
         );
      }
   }
}

export default Berries;

import React, { Component } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';

class Machine extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
   }
   componentWillMount() {
      this.getMachine();
   }
   async getMachine() {
      this.setState({
         loading: true
      });
      try {
         const response = await axios.get(
            `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
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
         return(
            <div>
            <p>id: {this.state.data.id}</p>
            <p>name: {this.state.data.item.name}</p>
            <p>move_name:{this.state.data.move.name} </p>
            <p>version_group_name:{this.state.data.version_group.name} </p>
          
            </div>
         );
      } else {
         return (
            <p>no data</p>
         );
      }
   }
}

export default Machine;


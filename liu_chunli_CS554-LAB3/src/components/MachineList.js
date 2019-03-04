import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MachineList extends Component { // to define a react component class, we need to extend React.Componeng
   constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false,
         searchTerm: undefined,
         searchData: undefined
      };
   }
      async getBerries() {
            try {
                  const response = await axios.get('https://pokeapi.co/api/v2/machine');
                  this.setState({ data: response.data});
                  //var newData = this.state.data.concat([response]);  
                  //this.setState({data: newData})
                 
               
            } catch (e) {
                  console.log(e);
            }
      }
      componentDidMount() {
            this.getBerries();
      }

      handleChange = (e) => {
            let value = e.target.value;
            this.setState({ searchTerm: value }, () => {
            this.searchBerries();
            });
      }
      
      onSubmit(e) {
            e.preventDefault();
      }
   async searchBerries(){
      if (this.state.searchTerm) {
            try {
               // const response = await axios.get('https://pokeapi.co/api/v2/result/' + this.state.searchTerm);
              
               // this.setState({searchData: response.data});

            } catch (e) {
               console.log(e);
            }
      }
   }
   render() {// only function that needed to define a react component
      let body = null;
      let li = null;
      if (this.state.searchTerm) {
         li =
            this.state.searchData &&
            this.state.searchData.map((results,index) => {
               //let name = results.name;
               let url = results.url;
               let num = url.split('/')[6]
               return (
                  <li key={index}>
                     <Link to={`/machine/${num}`}>{url}</Link>
                  </li>
               );
            });
      } else {
         li =
            this.state.data &&
            this.state.data.results.map((results,index) => (
               <li key={index}>
                  <Link to={`/machine/${results.url.split('/')[6]}`}>{results.url}</Link>
               </li>
            ));
      }
      
      body = (
         <div>
            <ul className="list-unstyled">{li}</ul>
         </div>
      );

      return body;
   }
}

export default MachineList;

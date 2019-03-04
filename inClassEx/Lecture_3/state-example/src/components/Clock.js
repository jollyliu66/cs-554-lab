import React, { Component } from 'react';
import './App.css';


class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            timeDiff: this.props.timeDiff,
            place: this.props.place
           
        };
    }
    
    componentDidMount() {// triger a hook
        this.timerID = setInterval(// setInternal make an update every second to the time object
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {// remove a hook
        clearInterval(this.timerID); // we store the interval's id so that we can clear it later when the component is unmounted.
    }
    
    tick() {
        this.setState({ // setState is interface for notifying it of changes that may require a re-render. 
            date: new Date()
               
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.place},{this.state.date.toLocaleTimeString("en-US",{timeZone:this.state.place})}</h2> 
               
            </div>
 
        )};
    
}

export default Clock;
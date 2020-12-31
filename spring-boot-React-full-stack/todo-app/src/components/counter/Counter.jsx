import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

// In React, .jsx File name need not match class name
class Counter extends Component {

    constructor() {

        super(); //Error 1 - 'this' keyword can not be used without super() call
        
        // 4) State part of a component - State is an internal Data Store of a Component
        // Define initial state in a constructor
        this.state = {
            counter: 0
        }
        
        // Bind method to a class inside a constructor
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    
    // 1) View part of a component
    render() {
    	// 3) Style part of a component (also in Counter.css)
    	const counter_style = {fontSize: "50px", padding: "15px 30px"}; // inline JavaScript css
        return (
            <div className="counter">
                { /* Note that we are not making a function call. We are  just passing a reference to function. */}
                { /* To call a class method, we have to call like 'this.increment' and not 'increment' */}
                { /* Component props are added in Component tag like attributes */ }
                { /* 5) props part of a component - data passed to a component */ }
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
                {/* Use className and not class */}
                <span className="count" style={counter_style}>{this.state.counter}</span>
                <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
        );
    }

    // 2) Logic part of a component
    reset() {
    	// Do not change state (counter) directly like - this.state.counter = 0 - Bad practice!
    	// Instead use setState as below
        this.setState({ counter: 0 });
    }
    
    // With Arrow function, method - class binding in constructor is not required 
    
//    reset = () => {
//    	// Do not change state (counter) directly like - this.state.counter = 0 - Bad practice!
//    	// Instead use setState as below
//        this.setState({ counter: 0 });
//    }
    

    // Note no function keyword for a class method
    increment(by) {
        //console.log(`increment from child - ${by}`)
    	// setState is a merge.
    	// prevState1 is a name that you have given to the argument passed to setState callback function. 
    	// What it holds is the value of state before the setState was triggered by React
        this.setState(
            (prevState1) => {
                return { counter: prevState1.counter + by }
            }
        );
    }
    

    decrement(by) {
        //console.log(`increment from child - ${by}`)
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by }
            }
        );
    }

}



// CounterButton component creates one set of Increment-Decrement buttons (like +1 -1)
// CounterButton component has 3 Component props (properties) - incrementMethod, decrementMethod and by
class CounterButton extends Component {

	render() {
        //render = () =>  {
        return (
            <div className="counter">
                {/* All JS expressions should be included inside {} */ }
                {/* Arrow method for onClick ensures that a method reference is passed */}
                <button onClick={() => this.props.incrementMethod(this.props.by)} >+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)} >-{this.props.by}</button>
            </div>
        )
    }

}

// Default value for component prop 'by'
CounterButton.defaultProps = {
    by: 1
}


// Type check constraint for component prop 'by'
CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter


/* 
 
 	React uses Virtual DOM for application efficiency and optimization.
 	Direct manipulation of DOM is a slow and complex process.
 	Virtual DOM concept makes it easier and efficient to manipulate DOM.
 	Virtual DOM is in-memory DOM for a react application.
 	Application creates/updates state/data in virtual DOM and then virtual DOM diffs and updates actual DOM.
 	
*/


























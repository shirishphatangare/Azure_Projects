
// To use JSX in a component, we need to include 'React' dependency from 'react' module
// To extend from Component, we need to include 'Component' dependency from 'react' module
// In 'react' module React Component is exported using 'export default' and Component is exported using 'export' keyword
// Notice how 'React' is imported without curly braces whereas 'Component' is imported using curly braces.

import React, { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent'
//import SecondComponent from './components/learning-examples/SecondComponent'
//import ThirdComponent from './components/learning-examples/ThirdComponent'
//import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'
import './App.css';
import './bootstrap.css';


// Every Component must extend Component from 'react' module
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Anything inside curly braces is an expression */}
        {/*<Counter />*/}
        <TodoApp />
        {/*<LearningComponents />*/}
      </div>
    );
  }
}

// Class Component

 /*class LearningComponents extends Component {
   render() {
     return (
       <div className="LearningComponents">
          My Hello World
          <FirstComponent></FirstComponent>
          <SecondComponent></SecondComponent>
          <SecondFComponent></SecondFComponent>
          <ThirdComponent></ThirdComponent>
       </div>
     );
   }
 }


// Function Component - It is used to create simple components

function SecondFComponent() {
    // Notice no render() method here 
	return (
       <div className="secondFComponent">
       		Second Function Component
       </div>
     );
}*/

export default App;


/********************** Basic React Notes ****************

Install node.js and npm from https://nodejs.org/

node --version
npm --version

-------------

'create-react-app' is used to set up a modern web app by running one command.
 npx create-react-app my-app-name
 cd my-app-name
 npm start
 
-------------
 
To create a production build use - npm run build 
Visual Studio code can be used for React development
package.json lists all the React app dependencies. It is like POM.xml for Maven.
when we start server, 'index.html' is loaded in browser
Use className and not class for react application.

----------------------

React can be used to develop both Web applications and native applications --

react - Common Core react modules
react-scripts - Common React Scripts
react-dom - Web application
react-native - For Native (Iphone/Android) app development

----------------------

Why to use Components in React?

1) Modularity
2) Reusability
3) Independent module - Separation of functionality

----------------------

Each Component constitutes below parts -

1) View - JSX or JS - render() method
2) Logic - JS - Helper JS classes methods
3) Styling - External css file or inline css
4) State - Internal data store - Defined and initialized in a Constructor of a Component
5) Props - Data passed to a Component as an attribute 

--------------------------------

Babel - React comes bundled with Babel compiler. 
Babel is the compiler for next generation JavaScript.
Babel compiles modern (next-gen) JSX code to browser ready JS code (lower JS versions).

--------------------------------

JSX Rules --

1) Only one JSX expression can be returned from render() method. All tags must be included in a single <div> tag or a React Fragment <>.
2) return statement returning a multi-line JSX expression must be included in parenthesis.
3) Component name must start with a capital letter.
4) To write JSX, 'React' from 'react' module must be imported in .jsx file.
5) Best practice - Each component is defined in it's own .jsx file or module.
6) Terminating Semicolons are not required in 99% cases in JS/JSX code.

--------------------------------

 To install new module and transitive dependencies use --
 npm install <Module-Name>
 npm add <Module-Name>
 
 ---------------------------------------
 
 Chrome plugin - React Developer Tools
 Chrome plugin - Talend API Tester to test REST endpoints
 
 */




















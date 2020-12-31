import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
               {/* Routing to components based on path */} 
                <Router>
                    {/* <Router> allows only one tag, hence included all contents inside fragment <> </> */}
                	<>
                        <HeaderComponent/>
                        {/* Switch ensures that only one component is matched for one defined route below */}
                        <Switch>
                            {/* 'exact' keyword to match path exactly with / and not with any other paths  */}
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            { /* Securing components using Authenticated Route */ }
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            { /* Note that the sequence of routes matters. Higher takes priority */ }
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

export default TodoApp
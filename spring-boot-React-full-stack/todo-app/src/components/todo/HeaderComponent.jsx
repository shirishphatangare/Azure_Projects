import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

// Using bootstrap framework to create Header. bootstrap.css is imported in App.js

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedInUser = AuthenticationService.getLoggedInUserName();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    {/* common link */ }
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                    {/* show below links only if user is logged in */ }
                    <ul className="navbar-nav">
                    	{/*JSX value should be either an expression or a quoted JSX text */}
                        {isUserLoggedIn && <li><Link className="nav-link" to={`/welcome/${loggedInUser}`}>Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                    	{/* show below links only if user is not logged in */ }
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
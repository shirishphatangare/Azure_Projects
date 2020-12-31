import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        
        // Adding state to LoginComponent
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    // Common Change event for multiple form elements
    handleChange(event) {
        // console.log(this.state);
    	// Update state for entered username and password values in respective text tags 
    	// Note that state variables 'username' and 'password' match with name attributes of text input tags
        this.setState(
            {
                /* Variable as a JSX key */
            	[event.target.name]
                    : event.target.value
            }
        )
    }


    loginClicked() {
        
    	// 1) Hardcoded authentication - in28minutes,dummy
    	
    	// if(this.state.username === 'in28minutes' && this.state.password === 'dummy'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({showSuccessMessage:true})
        //     //this.setState({hasLoginFailed:false})
        // }
        // else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }
    	
    	// --------------
    	
    	// 2) Basic Authentication - No Expiration time, No User/Authorization details - Just base 64 encoded username and password

        // AuthenticationService
        // .executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(() => {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }).catch( () =>{
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // })
    	
    	// --------------
        
    	//3) JWT Authentication - Standard content and structure. You can also extend it to contain User/Authorization details
    	// JWT (JSON Web Token) are an open, industry standard RFC 7519 method for representing claims securely between two parties.
    	// JWT.IO allows you to decode, verify and generate JWT.
    	// JWT has - 
    	// 1) HEADER (algorithm used for signature and type of token)
    	// 2) Payload (User/Authorization details)
    	// 3) Signature - HMACSHA512( base64UrlEncode(HEADER) + base64UrlEncode(Payload) + your-512-bit-secret )
    	// During login, get JWT token back. Use this JWT token for every subsequent request.  
    	// JWT has expiration time. Need to send refresh token request before expiration.
    	
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                // Push a new entry to the history stack and redirect to that path
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                
                    { /* Below 2 statements are function components with props */ }
                	{/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/} 
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}

                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
    
}


//function ShowInvalidCredentials(props) {
//	if(props.hasLoginFailed){
//		return <div> Invalid Credentials </div>
//	}
//	return null
//}
//
//
//function ShowLoginSuccessMessage(props) {
//	if(props.showSuccessMessage){
//		return <div> Login successful </div>
//	}
//	return null
//}


export default LoginComponent
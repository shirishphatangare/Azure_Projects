import axios from 'axios'
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

/*
 
 Whenever an authentication REST call is made, 2 requests are sent for initial authentication request 
 
  1) Preflight Request to REST Endpoint - Request Method is OPTIONS
  2) Actual REST call to same Endpoint - Request Method is GET
  
*/

	
class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    
    
    
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    
    
    // window.btoa for Base 64 encoding
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    // The sessionStorage property allows you to access a session storage object for the current origin
    // Using sessionStorage Object to store logged user name
    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        
        // Intercept every axios request and add Auth token to it
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
    	// Intercept each axios request and add auth header to it
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
            // Do something with request error - another argument to use() function
            //,(error) => {}
        )
        
        // Similarly a axios response can also be intercepted
        // axios.interceptors.response.use()
    }
}


// For react components, we export the class directly. However, for helper services, we export an instance of the class - an object.
export default new AuthenticationService()


/*Why we have not used localstorage?

Data stored in localStorage has no expiration time.
Data stored in sessionStorage gets cleared when the page session ends.

*/
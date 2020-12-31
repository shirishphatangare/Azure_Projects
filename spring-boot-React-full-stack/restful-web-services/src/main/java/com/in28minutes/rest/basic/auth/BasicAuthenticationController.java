package com.in28minutes.rest.basic.auth;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
//@CrossOrigin(origins="*") - prefer global CORS configuration instead of Controller-level CORS configuration
public class BasicAuthenticationController {

    @GetMapping(path = "/basicauth")
    public AuthenticationBean helloWorldBean() {
        //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
        return new AuthenticationBean("You are authenticated");
    }   
}


/*

Basic Authentication is disabled and only JWT authentication is enabled
By renaming basic Auth package to com.in28minutes.rest.basic.auth
Main Spring boot application RestfulWebServicesApplication with @SpringBootApplication is in pkg - com.in28minutes.rest.webservices.restfulwebservices
Only main package and it's sub-pakages are picked up by Spring configuration.
Pkg for JWT code is - com.in28minutes.rest.webservices.restfulwebservices.jwt and hence picked by Spring security configuration for authentication/authorization.

*/
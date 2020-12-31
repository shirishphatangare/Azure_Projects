package com.in28minutes.rest.webservices.restfulwebservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RestfulWebServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestfulWebServicesApplication.class, args);
	}
	
	// Prefer global CORS configuration instead of Controller-level CORS configuration
	// By default, all origins, all headers, credentials and GET, HEAD, and POST methods are allowed, and the max ageis set to 30 minutes. 
	// For PUT and DELETE, explicit config is required
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("GET","POST","PUT","DELETE");
			}
		};
	}
}


/* 
 JWT is implemented in com.in28minutes.rest.webservices.restfulwebservices.jwt and 
 com.in28minutes.rest.webservices.restfulwebservices.jwt.resource packages
*/ 
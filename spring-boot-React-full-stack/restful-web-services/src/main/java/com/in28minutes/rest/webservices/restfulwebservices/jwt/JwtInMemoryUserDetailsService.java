package com.in28minutes.rest.webservices.restfulwebservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  // Encrypted password - dummy
  /*static {
    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
  }*/
  
  // To change password get encrypted password from BcryptEncoderTest and replace it here
  //Encrypted password - password!23
  static {
	    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
	        "$2a$10$Yx4Yk/SAwbfY0V.0e9oGI.d0nf1r7dqhkNOIAySJVQAWKohhVnIqy", "ROLE_USER_2"));
  }

  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}



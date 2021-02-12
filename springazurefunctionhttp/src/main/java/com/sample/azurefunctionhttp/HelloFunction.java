package com.sample.azurefunctionhttp;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.sample.azurefunctionhttp.model.Greeting;
import com.sample.azurefunctionhttp.model.User;

@Component
public class HelloFunction implements Function<User, Greeting> {

    @Override
    public Greeting apply(User user) {
        return new Greeting("Hello, " + user.getName() + "!\n");
    }
}

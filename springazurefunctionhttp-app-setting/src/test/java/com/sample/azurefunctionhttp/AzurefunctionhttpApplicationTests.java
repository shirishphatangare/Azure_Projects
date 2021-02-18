package com.sample.azurefunctionhttp;


import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.springframework.cloud.function.adapter.azure.AzureSpringBootRequestHandler;

import com.sample.azurefunctionhttp.model.Greeting;
import com.sample.azurefunctionhttp.model.User;

public class AzurefunctionhttpApplicationTests {

    @Test
    public void test() {
        Greeting result = new HelloFunction().apply(new User("foo"));
        assertEquals("Hello, foo!\n", result.getMessage());
    }

    @Test
    public void start() throws Exception {
        AzureSpringBootRequestHandler<User, Greeting> handler = new AzureSpringBootRequestHandler<>(
                HelloFunction.class);
        Greeting result = handler.handleRequest(new User("foo"), null);
        handler.close();
        assertEquals("Hello, foo!\n", result.getMessage());
    }

}

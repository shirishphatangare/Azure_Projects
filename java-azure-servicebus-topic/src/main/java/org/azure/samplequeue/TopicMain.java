package org.azure.samplequeue;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import com.azure.messaging.servicebus.ServiceBusClientBuilder;
import com.azure.messaging.servicebus.ServiceBusErrorContext;
import com.azure.messaging.servicebus.ServiceBusException;
import com.azure.messaging.servicebus.ServiceBusFailureReason;
import com.azure.messaging.servicebus.ServiceBusMessage;
import com.azure.messaging.servicebus.ServiceBusMessageBatch;
import com.azure.messaging.servicebus.ServiceBusProcessorClient;
import com.azure.messaging.servicebus.ServiceBusReceivedMessage;
import com.azure.messaging.servicebus.ServiceBusReceivedMessageContext;
import com.azure.messaging.servicebus.ServiceBusSenderClient;

public class TopicMain {

	// Primary connection string for a Service Bus Namespace
	static String connectionString = "Endpoint=sb://service-bus-namespace-spring.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=WhZdS2PKpc9fi9Fb+J2i5RA6hrEbKPG25hziVWU4zn8=";
	static String topicName = "sampletopic1"; // Names are NOT case-sensitive   
	static String subName = "sampleSubscription1";
	
	public static void main(String[] args) throws InterruptedException {
		sendMessage();
		sendMessageBatch();
		receiveMessages();
	}
	
	// Send One message to the Queue
	static void sendMessage() {
		
		ServiceBusSenderClient senderClient = createSenderClient();
	    // send one message to the subscription
	    senderClient.sendMessage(new ServiceBusMessage("Hello, World!"));
	    System.out.println("Sent a single message to the topic: " + topicName);        
	}
	
	
	static List<ServiceBusMessage> createMessages()
	{
	    // create a list of sample messages and return it to the caller
	    ServiceBusMessage[] messages = {
	    		new ServiceBusMessage("First message"),
	    		new ServiceBusMessage("Second message"),
	    		new ServiceBusMessage("Third message")
	    };
	    return Arrays.asList(messages);
	}
	
	
	// Invokes the createMessages method to get the list of messages, prepares one or more batches, and sends the batches to the subscription.
	static void sendMessageBatch()
	{
		ServiceBusSenderClient senderClient = createSenderClient();

	    // Creates an ServiceBusMessageBatch where the ServiceBus.
	    ServiceBusMessageBatch messageBatch = senderClient.createMessageBatch();        

		// create a list of messages
	    List<ServiceBusMessage> listOfMessages = createMessages();

	    // We try to add as many messages as a batch can fit based on the maximum size and send to Service Bus when
	    // the batch can hold no more messages. Create a new batch for next set of messages and repeat until all
	    // messages are sent.        
	    for (ServiceBusMessage message : listOfMessages) {
	        if (messageBatch.tryAddMessage(message)) {
	            continue;
	        }

	        // The batch is full, so send the batch.
	        senderClient.sendMessages(messageBatch);
	        System.out.println("Sent a batch of messages to the topic: " + topicName);

	        // create a new batch
	        messageBatch = senderClient.createMessageBatch();

	        // Add that message that we couldn't before.
	        if (!messageBatch.tryAddMessage(message)) {
	            System.err.printf("Message is too large for an empty batch. Skipping. Max size: %s.", messageBatch.getMaxSizeInBytes());
	        }
	    }
	    
	    // Send leftover messages
	    if (messageBatch.getCount() > 0) {
	        senderClient.sendMessages(messageBatch);
	        System.out.println("Sent a batch of messages to the topic: " + topicName);
	    }

	    //close the client
	    senderClient.close();
	}
	
	
	static ServiceBusSenderClient createSenderClient() { 
		
	    // create a Service Bus Sender client for the topic 
	    return new ServiceBusClientBuilder()
	            .connectionString(connectionString)
	            .sender()
	            .topicName(topicName)
	            .buildClient();
	}
	
	
	// Retrieve messages from the subscription and handles received messages
	static void receiveMessages() throws InterruptedException
	{
	    // Create an instance of the processor through the ServiceBusClientBuilder
	    ServiceBusProcessorClient processorClient = createProcessorClient();
	    // starts the processor, waits for few seconds, prints the messages that are received, and then stops and closes the processor
	    System.out.println("Starting the processor");
	    processorClient.start();

	    TimeUnit.SECONDS.sleep(10);
	    System.out.println("Stopping and closing the processor");
	    processorClient.close();    	
	}
	
	// process a message received from the Service Bus subscription
	private static void processMessage(ServiceBusReceivedMessageContext context) {
	    ServiceBusReceivedMessage message = context.getMessage();
	    System.out.printf("Processing message. Session: %s, Sequence #: %s. Contents: %s%n", message.getMessageId(),
	        message.getSequenceNumber(), message.getBody());
	}
	
	// method to handle error messages.
	private static void processError(ServiceBusErrorContext context, CountDownLatch countdownLatch) {
	    System.out.printf("Error when receiving messages from namespace: '%s'. Entity: '%s'%n",
	        context.getFullyQualifiedNamespace(), context.getEntityPath());

	    if (!(context.getException() instanceof ServiceBusException)) {
	        System.out.printf("Non-ServiceBusException occurred: %s%n", context.getException());
	        return;
	    }

	    ServiceBusException exception = (ServiceBusException) context.getException();
	    ServiceBusFailureReason reason = exception.getReason();

	    if (reason == ServiceBusFailureReason.MESSAGING_ENTITY_DISABLED
	        || reason == ServiceBusFailureReason.MESSAGING_ENTITY_NOT_FOUND
	        || reason == ServiceBusFailureReason.UNAUTHORIZED) {
	        System.out.printf("An unrecoverable error occurred. Stopping processing with reason %s: %s%n",
	            reason, exception.getMessage());
	        // Decrements the count of the latch, releasing all waiting threads ifthe count reaches zero. 
	        countdownLatch.countDown();
	    } else if (reason == ServiceBusFailureReason.MESSAGE_LOCK_LOST) {
	        System.out.printf("Message lock lost for message: %s%n", context.getException());
	    } else if (reason == ServiceBusFailureReason.SERVICE_BUSY) {
	        try {
	            // Choosing an arbitrary amount of time to wait until trying again.
	            TimeUnit.SECONDS.sleep(1);
	        } catch (InterruptedException e) {
	            System.err.println("Unable to sleep for period of time");
	        }
	    } else {
	        System.out.printf("Error source %s, reason %s, message: %s%n", context.getErrorSource(),
	            reason, context.getException());
	    }
	}
	
	// Create an instance of the processor through the ServiceBusClientBuilder
	static ServiceBusProcessorClient createProcessorClient() { 
		//  we use a CountDownLatch in order to block a thread until other threads have finished some processing.
		CountDownLatch countdownLatch = new CountDownLatch(1);
	    // creates a ServiceBusProcessorClient for the subscription 
	    return new ServiceBusClientBuilder()
		        .connectionString(connectionString)
		        .processor()
		        .topicName(topicName)
		        .subscriptionName(subName)
		        .processMessage(TopicMain::processMessage)
		        .processError(context -> processError(context, countdownLatch))
		        .buildProcessorClient();
	}

}

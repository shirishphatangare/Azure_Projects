FROM openjdk:8-jdk-alpine
EXPOSE 8080
ADD target/*.jar hello-world-rest-api.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /hello-world-rest-api.jar"]

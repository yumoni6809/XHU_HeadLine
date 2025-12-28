FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY . /workspace
RUN mvn -f pom.xml clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /workspace/target/*.jar /app/app.jar
ENV SERVER_PORT=7111
EXPOSE 7111
ENTRYPOINT ["sh","-c","java -XX:+UseContainerSupport -jar /app/app.jar"]
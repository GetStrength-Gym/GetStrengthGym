FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY . .
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

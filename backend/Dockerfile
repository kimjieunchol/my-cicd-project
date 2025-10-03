FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the pre-built JAR from Maven build
COPY target/ahub-backend-*.jar app.jar

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Switch to non-root user
USER spring:spring

# Expose application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
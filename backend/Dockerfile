# Multi-stage build
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copy Maven artifact
COPY target/ahub-backend-*.jar app.jar

# Extract layers
RUN java -Djarmode=layertools -jar app.jar extract

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy extracted layers
COPY --from=builder /app/dependencies/ ./
COPY --from=builder /app/spring-boot-loader/ ./
COPY --from=builder /app/snapshot-dependencies/ ./
COPY --from=builder /app/application/ ./

# Set user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Expose port
EXPOSE 8080

# Run application
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
FROM openjdk:17-jdk-slim
# 또는 사용 중인 Java 버전

WORKDIR /app

# Maven/Gradle 빌드 결과물 복사
COPY target/*.jar app.jar
# 또는 Gradle인 경우: COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/* \

ENV PATH="/usr/lib/chromium/:${PATH}"
ENV CHROME_BIN="/usr/bin/chromium"

# Set the working directory in the container
WORKDIR /app

# Copy the application jar file to the container
COPY target/tennis-bot-0.0.1-SNAPSHOT.jar app.jar

# Make port 8080 available to the world outside this container
ENV PORT 8080

EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]

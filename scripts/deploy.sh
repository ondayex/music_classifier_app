#!/bin/bash

# Build and deploy the application using Docker Compose
docker compose -f docker/docker-compose.yml up --build -d

echo "Deployment completed successfully!" 
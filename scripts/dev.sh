#!/bin/bash

echo "Starting Portfolio Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start services
echo "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Check service health
echo "Checking service health..."

# Check backend
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "Backend is running at http://localhost:5000"
else
    echo "Backend is not responding"
fi

# Check frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "Frontend is running at http://localhost:3000"
else
    echo "Frontend is not responding"
fi

# Check MongoDB
if docker exec portfolio-mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    echo "MongoDB is running"
else
    echo "MongoDB is not responding"
fi

echo ""
echo "Development environment is ready!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo "MongoDB: localhost:27017"
echo ""
echo "To stop the environment, run: docker-compose down" 

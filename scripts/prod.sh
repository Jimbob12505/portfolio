#!/bin/bash

echo "Deploying Portfolio to Production..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Set production environment
export NODE_ENV=production

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Remove old images
echo "Cleaning up old images..."
docker system prune -f

# Build and start production services
echo "Building and starting production services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 15

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

# Check Nginx
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "Nginx is running at http://localhost"
else
    echo "Nginx is not responding"
fi

echo ""
echo "Production deployment is complete!"
echo "Website: http://localhost"
echo "Backend API: http://localhost/api"
echo ""
echo "To view logs, run: docker-compose -f docker-compose.prod.yml logs -f"
echo "To stop the environment, run: docker-compose -f docker-compose.prod.yml down" 

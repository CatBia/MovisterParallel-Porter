.PHONY: help build up down restart logs shell clean dev lint run-dev stop-dev

# Default target
help:
	@echo "Available commands:"
	@echo "  make build    - Build the Docker image"
	@echo "  make up       - Start the application in detached mode"
	@echo "  make down     - Stop and remove containers"
	@echo "  make restart  - Restart the application"
	@echo "  make logs     - Show application logs"
	@echo "  make shell    - Open a shell in the running container"
	@echo "  make clean    - Remove containers, images, and volumes"
	@echo "  make dev      - Run the app in development mode (without Docker)"
	@echo "  make run-dev  - Run the app in development mode with Docker"
	@echo "  make stop-dev - Stop the development Docker container"
	@echo "  make lint     - Run ESLint to check code quality"

# Build the Docker image
build:
	docker-compose build

# Start the application
up:
	docker-compose up 

# Stop the application
down:
	docker-compose down

# Restart the application
restart: down up

# Show logs
logs:
	docker-compose logs -f

# Open shell in container
shell:
	docker-compose exec web sh

# Clean everything
clean:
	docker-compose down -v
	docker rmi movister-parallel-porter-web 2>/dev/null || true
	@echo "Cleaned up containers, images, and volumes"

# Development mode (without Docker)
dev:
	npm run dev

# Run linting
lint:
	npm run lint

# Development mode with Docker
run-dev:
	docker-compose -f docker-compose.dev.yml up --build

# Stop development container
stop-dev:
	docker-compose -f docker-compose.dev.yml down


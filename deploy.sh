#!/bin/bash

# Test Tiger QA System - Production Deployment Script
# This script handles the complete deployment process

set -e

echo "🐅 Test Tiger QA System - Production Deployment"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js version: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Build the application
build_app() {
    print_status "Building application..."
    npm run build
    print_success "Application built successfully"
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p logs
    mkdir -p dist
    print_success "Directories created"
}

# Check environment variables
check_env() {
    print_status "Checking environment configuration..."
    
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Creating from template..."
        cp env.example .env
        print_warning "Please edit .env file and add your OpenAI API key if needed"
    fi
    
    print_success "Environment configuration checked"
}

# Start the application
start_app() {
    print_status "Starting Test Tiger QA System..."
    
    # Kill any existing processes
    print_status "Stopping any existing processes..."
    pkill -f "start_dashboard" || true
    lsof -ti:3000 | xargs kill -9 || true
    lsof -ti:8080 | xargs kill -9 || true
    
    # Start the application
    print_status "Starting dashboard server..."
    npm start &
    
    # Wait a moment for the server to start
    sleep 3
    
    # Check if the server is running
    if curl -f http://localhost:3000/ > /dev/null 2>&1; then
        print_success "Test Tiger QA System is running!"
        echo ""
        echo "🌐 Access Points:"
        echo "   Dashboard: http://localhost:3000"
        echo "   Test Website: http://localhost:8080/bad-website.html"
        echo ""
        echo "🛑 To stop the server, run: pkill -f 'start_dashboard'"
    else
        print_error "Failed to start the server. Check logs for details."
        exit 1
    fi
}

# Docker deployment option
docker_deploy() {
    print_status "Deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Build Docker image
    print_status "Building Docker image..."
    docker build -t test-tiger .
    
    # Stop existing container
    print_status "Stopping existing container..."
    docker stop test-tiger || true
    docker rm test-tiger || true
    
    # Run new container
    print_status "Starting Docker container..."
    docker run -d \
        --name test-tiger \
        -p 3000:3000 \
        -p 8080:8080 \
        -e OPENAI_API_KEY="${OPENAI_API_KEY:-}" \
        test-tiger
    
    print_success "Docker deployment completed!"
    echo ""
    echo "🌐 Access Points:"
    echo "   Dashboard: http://localhost:3000"
    echo "   Test Website: http://localhost:8080/bad-website.html"
}

# Main deployment function
main() {
    echo "Starting deployment process..."
    echo ""
    
    # Parse command line arguments
    DEPLOYMENT_TYPE="local"
    while [[ $# -gt 0 ]]; do
        case $1 in
            --docker)
                DEPLOYMENT_TYPE="docker"
                shift
                ;;
            --help)
                echo "Usage: $0 [--docker] [--help]"
                echo ""
                echo "Options:"
                echo "  --docker    Deploy using Docker"
                echo "  --help      Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Run deployment based on type
    if [ "$DEPLOYMENT_TYPE" = "docker" ]; then
        docker_deploy
    else
        check_node
        check_npm
        create_directories
        check_env
        install_dependencies
        build_app
        start_app
    fi
    
    print_success "Deployment completed successfully! 🎉"
}

# Run main function
main "$@"

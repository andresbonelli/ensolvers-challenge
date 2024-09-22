#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to install backend dependencies
install_backend() {
  echo "Installing backend dependencies..."
  cd backend
  npm install
  echo "Backend dependencies installed."
}

# Function to install frontend dependencies
install_frontend() {
  echo "Installing frontend dependencies..."
  cd ../frontend
  npm install
  echo "Frontend dependencies installed."
}

# Function to start the backend and frontend
start_apps() {
  echo "Starting the backend server..."
  (cd ../backend && npm run start:dev) &  # Run backend in the background
  echo "Starting the frontend server..."
  (cd ../frontend && npm run dev)         # Run frontend
}

# Main script execution
echo "Setting up the fullstack application..."

install_backend
install_frontend
start_apps

echo "Access app at http://localhost:5173"

# Wait for background processes to finish
wait
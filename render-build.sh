# Render Build Script for Backend
# This file tells Render to build from the backend directory

set -o errexit  # exit on error

echo "Building backend from /backend directory..."
cd backend
pip install --upgrade pip
pip install -r requirements.txt
echo "Backend build completed!"
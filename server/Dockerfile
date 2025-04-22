# server/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS server

# Set working directory
WORKDIR /app

# Copy package definitions and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy application source
COPY server/ ./

# Expose Express server port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
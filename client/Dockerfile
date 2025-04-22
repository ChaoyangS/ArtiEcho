# client/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS client

# Set working directory
WORKDIR /app

# Copy package definitions and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy application source
COPY client/ ./

# Expose Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]



# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Create a minimal image with the build files
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/build /app/build

# This container just provides the build files to be served by Nginx
CMD ["npm","start"]

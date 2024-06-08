# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY package*.json ./
COPY . .

# Install Node.js dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Create a minimal image with the build files and custom Nginx configuration
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY custom-nginx.conf /etc/nginx/custom-nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


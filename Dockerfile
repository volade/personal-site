FROM alpine:latest

# Set the working directory
WORKDIR /code

# Install dependencies
RUN apk add --no-cache bash curl nodejs npm\
    && rm /bin/sh && ln -s /bin/bash /bin/sh

# Copy the project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "build"]



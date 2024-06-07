FROM alpine:latest

# Set the working directory
WORKDIR /code

# Install dependencies
RUN apk add --no-cache bash curl \
    && rm /bin/sh && ln -s /bin/bash /bin/sh

# Install nvm, Node.js, and npm
ENV NVM_DIR /usr/local/nvm
RUN mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install node \
    && nvm alias default node \
    && nvm use default

# Set environment variables
ENV PATH $NVM_DIR/versions/node/v$(node -v)/bin:$PATH

# Copy the project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



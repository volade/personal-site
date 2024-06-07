FROM alpine:latest

# Set the working directory
WORKDIR /code

# Install dependencies
RUN apk add --no-cache bash curl \
    && rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NVM_DIR /usr/local/nvm

# Install nvm, Node.js, and npm
RUN mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install node \
    && nvm alias default $(nvm current) \
    && nvm use default \
    && echo 'export PATH="$NVM_DIR/versions/node/$(nvm current)/bin:$PATH"' >> $HOME/.bashrc

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



FROM alpine:latest

# Set the working directory
WORKDIR /code

# Install dependencies
RUN apk add --no-cache bash curl \
    && rm /bin/sh && ln -s /bin/bash /bin/sh \
    && mkdir /usr/local/nvm \
    && curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . /usr/local/nvm/nvm.sh \
    && nvm install node \
    && nvm alias default $(nvm current) \
    && nvm use default \
    && echo 'export PATH="$NVM_DIR/versions/node/$(nvm current)/bin:$PATH"' >> $HOME/.bashrc

# Set environment variables
ENV NVM_DIR /usr/local/nvm
ENV PATH $NVM_DIR/versions/node/$(nvm current)/bin:$PATH

# Copy the project files
COPY . /code/

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]


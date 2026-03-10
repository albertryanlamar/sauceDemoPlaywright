# Base image with Node.js
FROM node:20-bullseye

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Expose report folder to host
VOLUME ["/usr/src/app/report"]

# Default command to run tests
CMD ["npx", "playwright", "test"]
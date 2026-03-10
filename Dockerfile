# Base image with Node.js
FROM node:20-bullseye

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers with dependencies
RUN npx playwright install --with-deps

# Expose report folder for artifacts
VOLUME ["/usr/src/app/report"]

# Default command to run tests
CMD ["npx", "playwright", "test"]
# Start with the Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy the .env file (this is important!)
COPY .env .env

# Copy the source code
COPY ./src ./src
COPY ./public ./public

# Install dependencies, build the app, then clean up
RUN npm install \
 && npm install -g serve \
 && npm run build \
 && rm -rf node_modules

# Expose port for serve
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY server.js .

# Install dependencies
RUN npm install express redis

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]


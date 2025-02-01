# Use the official Node.js 22.13 Alpine image as a base
FROM node:22.13-alpine

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for faster layer caching
COPY package*.json ./

RUN npm i -g @nestjs/cli
# Install dependencies
RUN npm install --production

# Copy the rest of the application files into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port 3010 for the application
EXPOSE 3000

# Command to run the NestJS application
CMD ["node", "dist/main.js"]

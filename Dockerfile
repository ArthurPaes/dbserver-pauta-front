# Use the official Node.js 16 image as the base image
FROM node:18.10.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
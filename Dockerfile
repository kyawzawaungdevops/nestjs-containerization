# Base image with Node.js and PNPM
FROM node:20-slim AS base

# Install PNPM globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies using PNPM
RUN pnpm install

# Build the project
RUN pnpm run build

# base image
FROM node:20-slim AS developmanet

# Set the working directory
WORKDIR /app

# Copy production dependencies from the base stage
COPY --from=base /app/node_modules /app/node_modules

# Copy the compiled TypeScript code from the base stage
COPY --from=base /app/dist /app/dist

# Expose incoming connections
EXPOSE 3000

# Start the application
CMD [ "pnpm", "start","dev" ]

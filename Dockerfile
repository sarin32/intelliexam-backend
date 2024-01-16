# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the entire content of the local directory into the Docker image
COPY . .

# Install dependencies and build the application
RUN npm install
RUN npm run build:prod

# Stage 2: Final
FROM node:20-alpine AS final

WORKDIR /app

# Copy the built files from the 'builder' stage
COPY --from=builder /app/build .

# Copy assets folder from root to src
COPY src/assets ./src/assets

# Copy package.json and package-lock.json for production
COPY package.json .
COPY package-lock.json .

# Install only production dependencies
RUN npm install --only=production


# Set NODE_ENV as prod
ENV NODE_ENV=prod
# Set the default port as an environment variable
ENV PORT=3000

# Expose the port that the app will listen on
EXPOSE $PORT

# Set the command to start the application
CMD ["npm","run", "start:prod"]

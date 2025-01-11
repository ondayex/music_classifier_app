FROM node:18-alpine

WORKDIR /app

# Switch to root to install global packages
USER root
RUN npm install -g typescript vite

# Copy package files and set permissions
COPY package*.json ./
RUN chown -R node:node /app

# Switch to node user for the rest of the operations
USER node

# Install dependencies
RUN npm install

# Copy the rest of the application with correct ownership
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Move the build files to where nginx expects them
RUN mkdir -p /usr/share/nginx/html && \
    cp -r dist/* /usr/share/nginx/html/ || true

EXPOSE 3000

CMD ["npm", "run", "dev"] 
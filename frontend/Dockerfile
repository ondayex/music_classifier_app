FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with specific permissions and TypeScript globally
RUN mkdir -p /app/node_modules && \
    chown -R node:node /app && \
    npm install && \
    npm install -g typescript

# Switch to non-root user
USER node

# Copy the rest of the application
COPY --chown=node:node . .

# Build using npx for TypeScript compilation
RUN npx tsc && npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"] 
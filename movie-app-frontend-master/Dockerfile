FROM node:22-alpine AS build

WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Build-time API URL
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Copy source and build
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app

# Install a static server
RUN npm i -g serve@14.2.4

# Copy build output
COPY --from=build /app/build ./build

ENV PORT=3000
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]

# Installs Node.js image
FROM node:14-alpine
# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app
# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
# COPY ["package.json", "package-lock.json", ".env", "./"]
COPY package.json .
COPY .env .
# Installs all packages
RUN npm install
# Copies everything in the src directory to WORKDIR/src
COPY ./server ./server

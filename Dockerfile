FROM node:12

RUN npm install pm2 -g

VOLUME ["/app"]

WORKDIR /app

# Start process.yml
CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]

RUN apt-get update
WORKDIR /usr/src/app
COPY package*.json ./

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install

# Show current folder structure in logs

EXPOSE 20000
COPY . .
COPY pm2.json .


CMD [ "pm2-docker", "start", "pm2.json" ]
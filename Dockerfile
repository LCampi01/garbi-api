FROM node:18.16.0-alpine3.18

#need to check with Bhavin or Naresh if we need openssh client and also wich port will be exposed the app
RUN apk update && apk add git openssh-client

COPY .ssh/* /root/.ssh/
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

WORKDIR /var/www/ai-course-translation-assist

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3005

CMD export PORT=3000 && node index.js
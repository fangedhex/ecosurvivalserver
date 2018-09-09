FROM docker
WORKDIR /app
RUN apk add --no-cache nodejs npm python make gcc g++
ADD . .
RUN npm install && npm run compile
CMD [ "/usr/bin/node", "dist/index.js" ]

FROM mono
RUN apt-get update && apt-get install -y unzip
RUN mkdir /app && cd /app && curl https://s3-us-west-2.amazonaws.com/eco-releases/EcoServer_v0.7.0.4-beta.zip -o server.zip && unzip server.zip && rm server.zip
COPY Configs /app/Configs
EXPOSE 2999/udp 3000 3001
WORKDIR /app
CMD ["mono", "EcoServer.exe", "-nogui"]

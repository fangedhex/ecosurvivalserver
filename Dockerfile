FROM mono
ENV ECO_VERSION 0.7.2.5-beta
LABEL maintainer "Sylvain VISTE <viste.sylvain@gmail.com>"
RUN apt-get update && \
apt-get install -y wget unzip
EXPOSE 2999/udp 3000 3001
WORKDIR /app
ADD bootstrap.sh /app/
RUN chmod +x /app/bootstrap.sh
CMD ["./bootstrap.sh"]

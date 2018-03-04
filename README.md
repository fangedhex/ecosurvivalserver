# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

## How to build it on your Docker host

```
docker build -t ecoserver https://github.com/Fanged-Hex/EcoSurvivalServer.git
```

Note : There is no image uploaded to docker hub yet, so please use the command above, it will build it on your server :)

## How to launch

```
docker run -d -it -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage ecoserver
```


# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

https://hub.docker.com/r/fangedhex/ecosurvivalserver/

## How to launch

```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage fangedhex/ecosurvivalserver
```
It will run Eco Server on 0.7.2.5-beta version

## Custom eco version

First, check if there is no tag for the version you want on Docker Hub.

If not you can build, the version you want directly from my repository like this :

```
docker build -t ecosurvivalserver --build-arg ECO_VERSION=0.7.2.4-beta https://github.com/Fanged-Hex/EcoSurvivalServer.git
```

Replace 0.7.2.4-beta by the version you want :)

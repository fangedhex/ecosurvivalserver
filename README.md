# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

https://hub.docker.com/r/fangedhex/ecosurvivalserver/

## How to launch

```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage fangedhex/ecosurvivalserver
```
It will run Eco Server on 0.7.2.5-beta version

To specify a custom version, use environment variable like this :
```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage -e ECO_VERSION=0.7.2.4-beta fangedhex/ecosurvivalserver
```
Replace 0.7.2.4-beta by the version you want :)

# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

https://hub.docker.com/r/fangedhex/ecosurvivalserver/

## How to launch

```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage fangedhex/ecosurvivalserver
```
It will run Eco Server on latest version (if my bot pushed the latest version as intended)

If a version is not pushed into Docker Hub, don't hesitate to create a issue about it, maybe my bot didn't push it yet or maybe it just crashed (not supposed to happen) !

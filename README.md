# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

https://hub.docker.com/r/fangedhex/ecosurvivalserver/

## How to launch

```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage fangedhex/ecosurvivalserver:latest
```


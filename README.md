# Eco Survival Game Server for Docker

https://www.strangeloopgames.com/eco/

https://hub.docker.com/r/fangedhex/ecosurvivalserver/

## Note
I'm currently to busy to update this "project" and I'm also not currently playing this game so I'm not able to see if an update is done or not. So you can fork it if you want to update it.

## How to launch

```
docker run -d -p 2999:2999/udp -p 3000-3001:3000-3001 -v <storageDirOnHost>:/app/Storage fangedhex/ecosurvivalserver
```
It will run Eco Server on latest version (if my bot pushed the latest version as intended)

If a version is not pushed into Docker Hub, don't hesitate to create a issue about it, maybe my bot didn't push it yet or maybe it just crashed (not supposed to happen) !

## Have a suggestion or found a bug ? 

Feel free to create an issue here on Github about that.

## Support this project

I made this small project during my free time but it needs to be run on a small server and this server cost me money, so if you want to support this small project and can do a small donation, feel free to do it on this paypal mail address : viste.sylvain@gmail.com


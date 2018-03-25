#!/bin/sh
wget "https://s3-us-west-2.amazonaws.com/eco-releases/EcoServer_v${ECO_VERSION}.zip" -O /tmp/EcoServer.zip
unzip /tmp/EcoServer.zip -d /app/
rm /tmp/EcoServer.zip
mono EcoServer.exe -nogui

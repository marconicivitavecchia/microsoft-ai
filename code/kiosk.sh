#!/bin/bash

# Wait some time that system boot up completely
echo "Wait 10 seconds time for the system to boot..."
sleep 10
 
# Run this script in display 0 - the monitor
export DISPLAY=:0
 
# Hide the mouse from the display
unclutter &

# Kill old session of chromium, node and http-server
sudo killall chromium-browser node
 
# If Chrome crashes (usually due to rebooting), clear the crash flag so we don't have the annoying warning bar
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
 
# Run the back-end web server
node /home/pi/microsoft-ai/code/server/main.js &
sleep 5

# Run the front-end web server
echo "Starting front-end web server (production 8080)..."
http-server /home/pi/microsoft-ai/code/hello-frog/dist-prod/hdello-frog -p 8080 &
echo "Starting front-end web server (development 8081)..."
http-server /home/pi/microsoft-ai/code/hello-frog/dist-dev/hdello-frog -p 8081 &
sleep 5

# Run Chromium and open tabs
echo "Starting chromium with disabled cors... (note: do not use localhost, but use 127.0.0.1)"
export DISPLAY=:0;/usr/bin/chromium-browser --window-size=480,320 --kiosk --window-position=0,0 http://127.0.0.1:8080 --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
 

#!/bin/bash
 
# Run this script in display 0 - the monitor
export DISPLAY=:0
 
# Hide the mouse from the display
unclutter &
 
# If Chrome crashes (usually due to rebooting), clear the crash flag so we don't have the annoying warning bar
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences
 
# Run the back-end web server
cd /home/pi/microsoft-ai/code/server/
node main.js &
sleep 3

# Run the front-end web server
echo "Starting front-end web server..."
cd /home/pi/hello-frog
http-server . &
sleep 2

# Run Chromium and open tabs
echo "Starting chromium..."
/usr/bin/chromium-browser --window-size=480,320 --kiosk --window-position=0,0 http://localhost:8080 &
 

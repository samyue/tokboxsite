#!/bin/bash



# Get current path

PREFIX="$( cd "$( dirname "$0" )" && pwd )"



NODEDIR="$PREFIX/../server"

SCREENNAME="socketio"


# Kill running screen instances

for i in $(screen -ls | grep "$SCREENNAME" | cut -d'.' -f1); do kill $i; done



cd "$NODEDIR"



echo "Starting screen: $SCREENNAME"

screen -dm -S "$SCREENNAME" node "./socketio.js"



screen -ls
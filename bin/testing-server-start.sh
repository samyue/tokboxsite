#!/bin/bash



# Get current path

PREFIX="$( cd "$( dirname "$0" )" && pwd )"



BASEDIR="$PREFIX/.."

SCREENNAME="testing-server"


# Kill running screen instances

for i in $(screen -ls | grep "$SCREENNAME" | cut -d'.' -f1); do kill $i; done



cd "$BASEDIR"



echo "Starting screen: $SCREENNAME"

screen -dm -S "$SCREENNAME" grunt server



screen -ls
#!/bin/bash

# Convert the temple json file to a simple javascript "script" for use by leaflet
# Set up some variables
me=$USER
dest="$HOME/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Don't re-generate the new file unless the json exists & is non-zero length
if [ -s $dest/maps/temples.json ]
  then echo "var temples =  $(cat $dest/maps/temples.json)
;" > "$dest/maps/temples.js"
  else
    echo "$(date +%Y-%m-%d\ %H:%M:%S) json2js: the temples json file was empty or non-existent." 1>&2
fi

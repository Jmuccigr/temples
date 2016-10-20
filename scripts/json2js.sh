#!/bin/bash
# Convert the temple json file to a simple javascript "script" for use by leaflet

# Don't re-generate the new file unless the json exists & is non-zero length
if [ -s $HOME/Documents/github/local/temples/maps/temples.json ]
  then echo "var temples =  $(cat $HOME/Documents/github/local/temples/maps/temples.json)
;" > "$HOME/Dropbox/academic/mapping/temples.js"
  else
    echo "$(date): The temples json file was empty or non-existent." 1>&2
fi

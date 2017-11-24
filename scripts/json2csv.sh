#!/bin/bash

# Converts google-derived json into a nice csv

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')
newfile="$dest/temples.csv"

# Path to include homebrew jq for running via launchctl
export PATH="/usr/local/bin:$PATH"

# All the column names. Should be possible to do this automatically
# Removing this for ease of import into SQL database
# header='"id","name","dedicatee","type","location","city","country","orientation","date","startdateearly","startdatelate","century","sex","dedicationday","deitytype","extant","source","meetings","note","vici.org","pleiades","dare","arachne","wikipedia","wikidata","longitude","latitude"'

jq '.features[]' "$dest/temples.json" | jq '[ .properties.id, .properties.name, .properties.dedicatee, .properties.type, .properties.location, .properties.city, .properties.country, .properties.orientation, .properties.date, .properties.startdateearly, .properties.startdatelate, .properties.century, .properties.sex, .properties.dedicationday, .properties.deitytype, .properties.extant, .properties.source, .properties.meetings, .properties.note, .properties."vici.org", .properties.pleiades, .properties.dare, .properties.arachne, .properties.trismegistos, .properties.digitalromanforum,  .properties.digitalesforumromanum, .properties.wikipedia, .properties.wikidata, .properties.ads, .geometry.coordinates[0], .geometry.coordinates[1] ]' | jq -r @csv > "$newfile"

# echo $header > $newfile
# cat $temp/csv.csv > "$newfile"

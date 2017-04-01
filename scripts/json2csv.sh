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
header='"name","id","divinity","type","location","city","country","orientation","date","startdateearly","startdatelate","century","sex","dedicationday","deitytype","extant","source","meetings","blake","coarellicm","platnerandashby","richardson","stamper","ziolkowski","note","vici.org","pleiades","dare","arachne","wikipedia","wikidata","longitude","latitude"'

jq '.features[]' $dest/temples.json | jq '[ .properties.name, .properties.id, .properties.divinity, .properties.type, .properties.location, .properties.city, .properties.country, .properties.orientation, .properties.date, .properties.startdateearly, .properties.startdatelate, .properties.century, .properties.sex, .properties.dedicationday, .properties.deitytype, .properties.extant, .properties.source, .properties.meetings, .properties.blake, .properties.coarellicm, .properties.platnerandashby, .properties.richardson, .properties.stamper, .properties.ziolkowski, .properties.note, .properties."vici.org", .properties.pleiades, .properties.dare, .properties.arachne, .properties.wikipedia, .properties.wikidata,  .geometry.coordinates[0], .geometry.coordinates[1] ]' | jq -r @csv > "$temp/csv.csv"

echo $header > $newfile
cat $temp/csv.csv >> $newfile

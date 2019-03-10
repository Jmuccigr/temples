#!/bin/bash

# Converts google-derived json into a nice csv
# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')
newfile="$dest/temples.csv"

# Path to include homebrew jq for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Get all the column names for properties except for the record-keeping one, "checked".
header=(`jq '.features[0].properties' "$dest/temples.json" | jq 'keys_unsorted[]' | grep -v "checked" | tr -d '"'`)
proplist=""
for i in ${header[*]}; do
  proplist="$proplist .properties.$i,"
done

# Re-assemble the CVS using jq, then converting the escaped quotation marks
jq '.features[]' "$dest/temples.json" | jq "[ $proplist .geometry.coordinates[0], .geometry.coordinates[1] ]" | jq -r @csv | perl -pe 's/([ a-zA-Z])""/\1\\"/g' > "$dest/temples.csv"

#!/bin/bash

# Converts google-derived json into a nice csv
# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')
newfile="$dest/temples.csv"
proplist=""

# Path to include homebrew jq for running via launchctl
export PATH="/opt/homebrew/bin:$PATH"

# Get all the column names for properties except for the record-keeping one, "checked".
# Google v4 API doesn't return blank values at the end of rows, so we have to grab
# the keys from _all_ the records and then winnow them down with the awk bit
header=(`jq '.features[].properties' "$dest/temples.json" | jq 'keys_unsorted[]' | awk '!x[$0]++' | grep -v "checked" | tr -d '"'`)

# Now generate the list of properties for jq with nulls getting reported as empty strings
for i in ${header[*]}; do
  proplist="$proplist .properties.$i // \"\","
done

# Somehow the proplist seems to come out too short sometimes, so only coords make it to json.
# Do a simple check to avoid this.
if [ `echo $proplist | wc -w` -lt 100 ]
  then
    echo "$(date +%Y-%m-%d\ %H:%M:%S) json2csv: proplist is too short." 1>&2
    exit 1
fi

# Re-assemble the CVS using jq, then converting the escaped quotation marks
jq '.features[]' "$dest/temples.json" | jq "[ $proplist .geometry.coordinates[0], .geometry.coordinates[1] ]" | jq -r @csv | perl -pe 's/([ a-zA-Z])""/\1\\"/g' > "$dest/temples.csv"

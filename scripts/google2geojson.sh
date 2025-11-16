#!/bin/bash

# Converts a Google spreadsheet to geojson

# Set the target directory
# Abstract out my local info (which also anonymizes it)
me=$USER
# Set the folder to one in the relevant github repository
destFolder="/Users/$me/Documents/github/local/temples/"
# Make sure that folder exists
if [ ! -d $destFolder ]
then
    echo -e "\nTarget folder:\n\n\t"$destFolder"\n\ndoes not exist. It must. Create it before continuing.\n"
    exit
fi

# Get the spreadsheet feed in json format
g_json=$(curl -s -stdout 'https://spreadsheets.google.com/feeds/list/1by5Xo90wcyYJBWkZs-dtqpkCnoKPlf6CJdEmyXJ4rZ4/1/public/values?alt=json')
# Grab only the rows/entries & clean out some Google cruft: gsx$ prefix; unnecessary $t attribute using perl since sed doesn't support the non-greedy operater ?
g_json=$(echo $g_json | jq -c '.feed.entry[]' | sed 's/gsx\$//g' | perl -pe 's/:{"\$t":(".*?")}/:\1/g')
# Include only entries with geographical data, after substituting for anything that isn't a digit or .
g_json=$(echo $g_json | jq 'select( (.longitude | gsub("[\\D\\.]";"")) != "")')

# Convert remaining entries to geojson variables
# Currently a minimal set
g_json=$(echo $g_json | jq -c '{type: "Feature", geometry: {type: "Point", coordinates: [(.longitude|tonumber), (.latitude|tonumber)]}, "properties": {name: .name}}' | tr '\n' ',' | sed 's/,$//g')

# Put it all together as valid geojson in the variable "output"
# Start with the header
output="{\"type\": \"FeatureCollection\",\"features\": ["  
# Add the data from the spreadsheet
output="$output $g_json"
# Close it up with closing brackets
output="$output ]}"

# Create output file with prettified data
echo $output | jq '.' > $destFolder"temples.json"

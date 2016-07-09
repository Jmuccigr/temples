#!/bin/bash

# Converts a Google spreadsheet to geojson

# Set the target directory
# Abstract out my local info (which also anonymizes it)
me=`whoami`
# Set the folder to one in the relevant github repository
destFolder="/Users/""$me""/Documents/github/local/temples/"
# Make sure that folder exists
if [ ! -d $destFolder ]
then
    echo -e "\nTarget folder:\n\n\t"$destFolder"\n\ndoes not exist. It must. Create it before continuing.\n"
    exit
fi

# Get the spreadsheet feed in json format
g_json=$(curl -s -stdout 'https://spreadsheets.google.com/feeds/list/1by5Xo90wcyYJBWkZs-dtqpkCnoKPlf6CJdEmyXJ4rZ4/1/public/values?alt=json')
# Clean out some of the Google cruft and grab only the rows/entries themselves
g_json=$(echo $g_json | sed 's/gsx\$//g' | jq -c '.feed.entry[]')
# Include only entries with geographical data, after substituting for anything that isn't a digit or .
# And yes, four backslashes are needed to get the escaping to work.
g_json=$(echo $g_json | jq 'select( (.longitude."$t" | gsub("[\\\\D\\\\.]";"")) != "")')
# Convert remaining entries to geojson variables
# Currently a minimal set
g_json=$(echo $g_json | jq -c '{type: "Feature", geometry: {type: "Point", coordinates: [(.longitude."$t"|tonumber), (.latitude."$t"|tonumber)]}, "properties": {name: .name."$t"}}' | tr '\n' ',' | sed 's/,$//g')

# Put it all together as valid geojson in the variable "output"
# Start with the header
output="{\"type\": \"FeatureCollection\",\"features\": ["  
# Add the data from the spreadsheet
output="$output $g_json"
# Close it up with closing brackets
output="$output ]}"

# Create output file with prettified data
echo $output | jq '.' > "/Users/$me/Downloads/temples.json"

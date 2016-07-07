#!/bin/bash

# Converts a Google spreadsheet to geojson

destFolder='/Users/john_muccigrosso/Documents/github/local/temples/'

# Get the spreadsheet feed in json format
g_json=`curl -s -stdout 'https://spreadsheets.google.com/feeds/list/1by5Xo90wcyYJBWkZs-dtqpkCnoKPlf6CJdEmyXJ4rZ4/1/public/values?alt=json'`
# Clean it up a bit
g_json=`echo $g_json | sed 's/gsx\\$//g' | jq -c '.feed.entry[]'`
# Only entries that have geographical data, substituting for anything that isn't a digit or .
# And yes, four backslashes are needed to get the escaping to work.
g_json=`echo $g_json | jq 'select( (.longitude."$t" | gsub("[\\\\D\\\\.]";"")) != "")'`
# Convert remaining entries to geojson variables
g_json=`echo $g_json | jq -c '{type: "Feature", geometry: {type: "Point", coordinates: [(.longitude."$t"|tonumber), (.latitude."$t"|tonumber)]}, "properties": {name: .temple."$t"}}' | tr '\n' ',' | sed 's/,$//g'`

# Put it all together as valid geojson
# Start with the header
output="{\"type\": \"FeatureCollection\",\"features\": ["  
# Add the data from the spreadsheet
output="$output $g_json"
# Close it up with closing brackets
output="$output  ]}"

# Create output file with prettfied data
echo $output | jq '.' > "$destFolder""json_test.json"

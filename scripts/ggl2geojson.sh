#!/bin/bash

# Converts a Google spreadsheet to geojson, v. 3.

# Set up some variables
me=$(whoami)
sheet=$(cat "/Users/$me/Documents/Academic/Research/google_info/temples_sheet_ID.txt")
apikey=$(cat "/Users/$me/Documents/Academic/Research/google_info/google_api_key.txt")
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like jq for running via launchctl
export PATH="/opt/homebrew/bin:$PATH"

# Quick check that ogr2ogr exists
check=$(which ogr2ogr)
if [ ${#check} = 0 ]
    then
      echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: ogr2ogr not found." 1>&2
      exit 1
fi

# Get google doc as json via the v4 API & exit on failure to return any/enough data
# Be sure to grab all the needed columns
json=$(curl -s -stdout "https://sheets.googleapis.com/v4/spreadsheets/$sheet/values/temples!A:AV?key=$apikey")
if [ ${#json} -lt 1000 ]
then
   errMsg=`echo "$json" | jq .error.message`
   if [ -n "$errMsg" ]
   then
      echo "$(date +%Y-%m-%d\ %H:%M:%S) Google error getting temples: $errMsg" 1>&2
   else
      echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: Too little or no temple data from Google spreadsheet server" 1>&2
   fi
   exit 1
fi

# Make sure response is also valid json and convert it to csv
echo "$json" | json_verify -q
if [ "$?" == 0 ]
then
    csv=`echo "$json" | jq -r '.values[] | @csv'`
else
   echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: Invalid temple json received from google" 1>&2
   exit 1
fi

# Make sure the resultant csv is big enough
# First check that individual lines aren't just coords by counting lengths
longLinesCount=`echo "$csv" | awk '{print length}'  | sort | uniq -c | sort | tail -n 1 |  awk '{print $1}'`
# Then also check that the variable is big enough
if [ ${#csv} -lt 100 ] || [ $longLinesCount -gt 200 ]
   then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: json to csv conversion is too short" 1>&2
   exit 1
fi

# Fix headers so that they're like the old method:
# 		= no caps or spaces
# Delete this when I decide there's no harm
newheaders=`echo "$csv" | head -n 1 | tr -d " " | tr [:upper:] [:lower:]`
newsheet=`echo "$csv" | tail -n +2`

csv=`echo -e $newheaders"\n""$newsheet"`

# Make sure something has changed or else exit
if [ -s "$dest/sheet.csv" ]
then
	csvsum=`echo "$csv" | md5`
	filesum=`md5 -q "$dest/sheet.csv"`
	if [ $csvsum = $filesum ]
	then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: No change to temple data." 1>&2
	   exit 0
	fi
fi

# Save a copy as a csv file
echo "$csv" > "$dest/sheet.csv"
if [ ! $? ]
then
  echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: There was a problem saving the temple csv file." 1>&2
  exit 1
fi

# Convert to bad geojson without using VRT file

rm "$temp/sheet.json" 2>/dev/null
ogr2ogr -f "geojson" "$temp/sheet.json" "$dest/sheet.csv" -oo X_POSSIBLE_NAMES=longitude -oo Y_POSSIBLE_NAMES=latitude -skipfailures -addfields

# Replace null geometry with blank coordinates, and remove some unwanted
# properties that were stuck in during the csv export, after making sure that
# file exists or else something went wrong. v4 API doesn't include blank values
# at line ends, so more steps are needed after removing coord lines
if [ -s "$temp/sheet.json" ]
then
	cat "$temp/sheet.json"  | perl -pe 's/(\"geometry\"\: )null/\1\{\"type\"\: \"Point\",\"coordinates\"\: \[\"\",\"\"\]\}/g' | jq '.' | \
	   grep -v -e \"latitude\": -e \"longitude\":  | \
	   perl -pe "s/\n/ /g" \
	   | perl -pe "s/,\s+}/}/g" | jq '.' \
	   > "$temp/temples.json"

	# Get rid of last bit of extra stuff from the download
	jq '{type: .type, features: .features}' "$temp/temples.json" > "$dest/temples.json"

    # Save a subset as a copy for Pelagios & easy retrieval of json
	jq -c '.features[]' "$temp/temples.json" > "$dest/pelagios.json"

    # For mapping, save a second copy with only entries including coordinates
	head -n 3 "$dest/temples.json" > "$temp/temples.json"
	text=$(jq -c '.features[] | select (.geometry.coordinates[0] | length >= 1)' "$dest/temples.json" | tr '\n' ',')
	text="$text ]}"
	echo $(echo $text | sed 's/, \]\}/\]\}/') >> "$temp/temples.json"
	jq '.' "$temp/temples.json" > "$dest/maps/temples.json"
else
  echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2geojson: there was a problem creating the json file." 1>&2
  exit 1
fi

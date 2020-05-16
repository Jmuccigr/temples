#!/bin/bash

# Converts a Google spreadsheet to geojson, v. 3.

# Set up some variables
me=$(whoami)
sheet=$(cat "/Users/$me/Documents/Academic/Research/google_info/temples_sheet_ID.txt")
apikey=$(cat "/Users/$me/Documents/Academic/Research/google_info/google_api_key.txt")
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like jq for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Quick check that ogr2ogr exists
check=$(which ogr2ogr)
if [ ${#check} = 0 ]
    then
      echo "$(date +%Y-%m-%d\ %H:%M:%S) ogr2ogr not found." 1>&2
      exit 0
fi

# Get google doc as json via the v4 API & exit on failure to return any/enough data
json=$(curl -s -stdout "https://sheets.googleapis.com/v4/spreadsheets/$sheet/values/temples!A:AS?key=$apikey")
if [ ${#json} -lt 100 ]
   then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) Too little or no temple data from Google spreadsheet server" 1>&2
   exit 0
fi

# Make sure response is also valid json and convert it to csv
echo "$json" | json_verify -q
if [ "$?" == 0 ]
then
    json=`echo "$json" | jq -r '.values[] | @csv'`
else
   echo "$(date +%Y-%m-%d\ %H:%M:%S) Invalid temple json received from google" 1>&2
   exit 0
fi

# Fix headers so that they're like the old method:
# 		= no caps or spaces
# Delete this when I decide there's no harm
newheaders=`echo "$json" | head -n 1 | tr -d " " | tr [:upper:] [:lower:]`
newsheet=`echo "$json" | tail -n +2`

json=`echo -e $newheaders"\n""$newsheet"`

# Make sure something has changed or else exit
if [ -s "$dest/sheet.csv" ]
then
	jsonsum=`echo "$json" | md5`
	filesum=`md5 -q "$dest/sheet.csv"`
	if [ $jsonsum = $filesum ]
	then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to temple data." 1>&2
	   exit 0
	fi
fi

# Save a copy as a csv file
echo "$json" > "$dest/sheet.csv"
if [ ! $? ]
then
  echo "$(date +%Y-%m-%d\ %H:%M:%S) There was a problem saving the temple csv file." 1>&2
  exit 0
fi

# Convert to bad geojson

# Create the vrt file for the conversion from csv to geojson
text="      <OGRVRTDataSource>"
text="$text     <OGRVRTLayer name=\"sheet\">"
text="$text         <SrcDataSource>$dest/sheet.csv</SrcDataSource>"
text="$text         <GeometryType>wkbPoint</GeometryType>"
text="$text         <LayerSRS>WGS84</LayerSRS>"
text="$text         <GeometryField encoding=\"PointFromColumns\" x=\"Longitude\" y=\"Latitude\"/>"
text="$text     </OGRVRTLayer>"
text="$text </OGRVRTDataSource>"

echo $text > "$temp/sheet.vrt"

rm "$temp/sheet.json" 2>/dev/null
ogr2ogr -addfields -skipfailures -f geojson "$temp/sheet.json" "$temp/sheet.vrt"

# Clear false 0,0 coords resulting from empty fields, and remove some unwanted
# properties that were stuck in during the csv export, after making sure that
# file exists or else something went wrong. v4 API doesn't include blank values
# at line ends, so more steps are needed after removing coord lines
if [ -s "$temp/sheet.json" ]
then
	cat "$temp/sheet.json"  | perl -pe "s/\[ 0\.0, 0\.0 \]/[\"\",\"\"]/g"  | jq '.' | \
	   grep -v -e \"latitude\": -e \"longitude\":  | \
	   perl -pe "s/\n/ /g" \
	   | perl -pe "s/,\s+}/}/g" | jq '.' \
	   > "$temp/temples.json"

	# Get rid of last bit of extra stuff from the download
	jq '{type: .type, features: .features}' "$temp/temples.json" > "$dest/temples.json"

    # Save a subset as a copy for Pelagios
	jq -c '.features[]' "$temp/temples.json" > "$dest/pelagios.json"

    # For mapping, save a second copy with only entries including coordinates
	head -n 3 "$dest/temples.json" > "$temp/temples.json"
	text=$(jq -c '.features[] | select (.geometry.coordinates[0] | length >= 1)' "$dest/temples.json" | tr '\n' ',')
	text="$text ]}"
	echo $(echo $text | sed 's/, \]\}/\]\}/') >> "$temp/temples.json"
	jq '.' "$temp/temples.json" > "$dest/maps/temples.json"
else
  echo "$(date +%Y-%m-%d\ %H:%M:%S) There was a problem creating the json file." 1>&2
  exit 1
fi

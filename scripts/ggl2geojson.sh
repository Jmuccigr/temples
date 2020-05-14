#!/bin/bash

# Converts a Google spreadsheet to geojson, v. 2.

# Set up some variables
me=$(whoami)
sheet=$(cat "/Users/$me/Documents/Academic/Research/google_info/temples_sheet_ID.txt")
apikey=$(cat "/Users/$me/Documents/Academic/Research/google_info/google_api_key.txt")
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like jq for running via launchctl
export PATH="/usr/local/bin:/usr/local/opt/gdal2/bin:$PATH"

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

# Create the vrt file for the conversion from csv to geojson
text="      <OGRVRTDataSource>"
text="$text     <OGRVRTLayer name=\"sheet\">"
text="$text         <SrcDataSource>$temp/sheet.csv</SrcDataSource>"
text="$text         <GeometryType>wkbPoint</GeometryType>"
text="$text         <LayerSRS>WGS84</LayerSRS>"
text="$text         <GeometryField encoding=\"PointFromColumns\" x=\"Longitude\" y=\"Latitude\"/>"
text="$text     </OGRVRTLayer>"
text="$text </OGRVRTDataSource>"

echo $text > "$temp/sheet.vrt"

# Convert json to csv
# perl bit adds a date stamp to the warning output for log file
rm "$temp/sheet"*.csv 2>/dev/null
echo $json | jq -r '.values[] | @csv' > "$temp/sheet.csv" | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_' 1>&2

# Make sure the csv has been created and is big enough or else exit
if  [ ! -s "$temp/sheet.csv" ]
then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) sheet.csv not created." 1>&2
   echo "Error with sheet.csv creation" | mail -s "Temples problem: data" $me
   exit 0
else
    if  [ `stat -f%z "$temp/sheet.csv"` -lt 50000 ]
    then
		echo "$(date +%Y-%m-%d\ %H:%M:%S) sheet.csv is too small." 1>&2
		echo "Too small sheet.csv" | mail -s "Temples problem: data" $me
		exit 0
	fi
fi

# Fix headers so that they're like the old method:
# 		= no caps or spaces
# Delete this when I decide there's no harm
newheaders=`head -n 1 "$temp/sheet.csv" | tr -d " " | tr [:upper:] [:lower:]`
newsheet=`tail -n +2 "$temp/sheet.csv"`
echo -e $newheaders"\n""$newsheet" > "$temp/sheet.csv"

# Make sure something has changed or else exit
if [ -s "$dest/sheet.csv" ]
then
	csvdiff=$(diff "$temp/sheet.csv" "$dest/sheet.csv")
	if [ ${#csvdiff} -eq 0 ]
	   then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to temple data." 1>&2
	   exit 0
	fi
else
    echo "$(date +%Y-%m-%d\ %H:%M:%S) No csv file in destination folder." 1>&2
fi

# Save a copy of the csv file
cp "$temp/sheet.csv" "$dest/sheet.csv" 2>&1 | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_' 1>&2

# Convert to bad geojson
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

#!/bin/bash

# Converts a Google spreadsheet to csv, v. 2.

# Set up some variables
me=$(whoami)
sheet=$(cat "/Users/$me/Documents/Academic/Research/google_info/temples_sheet_ID.txt")
apikey=$(cat "/Users/$me/Documents/Academic/Research/google_info/google_api_key.txt")
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like jq for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Get google doc as json via the public feed & exit on failure to return any/enough data
json=$(curl -s -stdout "https://sheets.googleapis.com/v4/spreadsheets/$sheet/values/citations!A:AS?key=$apikey")
if [ ${#json} -lt 100 ]
then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) Too little or no citation data from Google spreadsheet server" 1>&2
   exit
fi

# Make sure response is also valid json
echo "$json" | json_verify -q
if [ "$?" == 0 ]
then
    json=`echo "$json" | jq -r '.values[][0:4] | @csv // "two"' | tail -n +2 | sort`
else
   echo "$(date +%Y-%m-%d\ %H:%M:%S) ggl2cites: Invalid citation json received from google" 1>&2
   exit 0
fi

# Make sure something has changed or else exit
if [ -s "$dest/citations.csv" ]
then
	jsonsum=`echo "$json" | md5`
	filesum=`md5 -q "$dest/citations.csv"`
	if [ $jsonsum = $filesum ]
	then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to temple citations." 1>&2
	   exit 0
	fi
fi

# Save a copy of the csv file
echo "$json" > "$dest/citations.csv" 2>&1 | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_' 1>&2

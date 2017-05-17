#!/bin/bash

# Converts a Google spreadsheet to csv, v. 1.

# Set up some variables
me=$(whoami)
key=$(cat "/Users/$me/Documents/Academic/Research/temples_key.txt")
dest="/Users/$me/Documents/github/local/temples"
temp=$(echo $TMPDIR | sed 's:/$::')

# Path to include homebrew stuff like ogr2ogr for running via launchctl
export PATH="/usr/local/bin:/usr/local/opt/gdal2/bin:$PATH"

# Quick check that ogr2ogr exists
check=$(which ogr2ogr)
if [ ${#check} = 0 ]
    then
      echo "$(date +%Y-%m-%d\ %H:%M:%S) ogr2ogr not found." 1>&2
      exit
fi

# Get google doc as xml via the public feed & exit on failure to return any/enough data
xml=$(curl -s -stdout "https://spreadsheets.google.com/feeds/list/$key/2/public/values")
if [ ${#xml} -lt 100 ]
   then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) Too little or no citation data from Google spreadsheet server" 1>&2
   exit
fi

# Clean up the entry names in the xml, filter out unwanted fields & save to file for ogr2ogr
xml=$(echo $xml | tidy -xml -iq | sed 's/gsx://g' | grep -e entry -e /loci -e /refkey -e /templeid)
echo "<feed>
$xml
</feed>" > "$temp/citations.xml"

# Convert to csv
# perl bit adds a date stamp to the warning output for log file
rm "$temp/citations.csv" 2>/dev/null
ogr2ogr -f csv "$temp/citations.csv" "$temp/citations.xml" 2>&1 | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_' 1>&2

# Make sure the csv has been created or else exit
if  [ ! -s "$temp/citations.csv" ]
then
   echo "$(date +%Y-%m-%d\ %H:%M:%S) citations.csv not created." 1>&2
   echo "Error with citations.csv creation" | mail -s "Temples problem: citations" $me 
   exit
fi

# Make sure something has changed or else exit
if [ -s "$dest/citations.csv" ]
then
	csvdiff=$(diff "$temp/citations.csv" "$dest/citations.csv")
	if [ ${#csvdiff} -eq 0 ]
	   then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to temple citations." 1>&2
	   exit
	fi
fi

# Save a copy of the csv file
cp "$temp/citations.csv" "$dest/citations.csv" 2>&1 | perl -p -MPOSIX -e 'BEGIN {$|=1} $_ = strftime("%Y-%m-%d %T ", localtime) . $_' 1>&2

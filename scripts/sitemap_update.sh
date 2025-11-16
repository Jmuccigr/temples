#!/bin/bash

# Updates sitemap file
# Set up some variables
me=$USER
src="/Users/$me/Documents/github/local/temples"

# Update sitemap file
sitelist=$(grep romeresearchgroup.org/items/[0-9] $src/temples.ttl | perl -pe 's/<(.*)>.*/\1/')
if [ ${#sitelist} != 0 ]
then
	csvdiff=$(diff "$src/sitemap.txt" <(echo "$sitelist"))
	if [ ${#csvdiff} -eq 0 ]
	then
	  echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to sitemap." 1>&2
	  exit 0
	else
	  echo "$sitelist" > $src/sitemap.txt
	fi
else
    echo "$(date +%Y-%m-%d\ %H:%M:%S) sitemap_update: Error making csv file." 1>&2
fi


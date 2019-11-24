#!/bin/bash

# Updates sitemap file
# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Update sitemap file
grep romeresearchgroup.org/items/[0-9] $src/temples.ttl | perl -pe 's/<(.*)>.*/\1/' > $src/sitemap2.txt

if [ -s "$src/sitemap2.txt" ]
then
	csvdiff=$(diff "$src/sitemap.txt" "$src/sitemap2.txt")
	if [ ${#csvdiff} -eq 0 ]
	   then
	   echo "$(date +%Y-%m-%d\ %H:%M:%S) No change to sitemap." 1>&2
	   rm $src/sitemap2.txt
	   exit 0
	else
	   mv $src/sitemap2.txt $src/sitemap.txt
	fi
else
    echo "$(date +%Y-%m-%d\ %H:%M:%S) Error making csv file." 1>&2
fi


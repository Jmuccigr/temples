#!/bin/bash

# Updates sitemap file and pushes it to site
# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Update sitemap file
grep romeresearchgroup.org/items/[0-9] $src/temples.ttl | perl -pe 's/<(.*)>.*/\1/' > /Users/$me/Documents/github/local/temples/sitemap.txt


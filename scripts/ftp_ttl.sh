#!/bin/bash

fname='/Users/john_muccigrosso/Documents/github/local/temples/htdocs-items/temples.ttl'

# Make sure file exists before doing anything
if [ -s $fname ]
  then
  /usr/local/bin/duck -r 4 -y -e upload --synchronize ftps://romerese@romeresearchgroup.org/public_html/items/ $fname
fi


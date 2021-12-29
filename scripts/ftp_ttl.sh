#!/bin/bash

# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Path to include Cyberduck's duck command for running via launchctl
export PATH="/usr/local/bin:$PATH"

fname="$src/htdocs-items/temples.ttl"

# Make sure file exists before doing anything
if [ -s $fname ]
then
    duck -r 4 -y -e upload --synchronize ftps://romerese@romeresearchgroup.org/public_html/items/ $fname
else
    echo "$(date +%Y-%m-%d\ %H:%M:%S) ftp_ttl: the temples turtle file was empty or non-existent." 1>&2
fi


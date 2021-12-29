#!/bin/bash

# Pushes updated turtle to site
# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Path to include Cyberduck's duck command for running via launchctl
export PATH="/usr/local/bin:$PATH"

# If file is big enough, Upload via FTP and log success or failure
fsize=`stat -f%z "$src/temples.ttl"`
if [ $fsize -lt 10000 ]
then
	echo "$(date +%Y-%m-%d\ %H:%M:%S) duckttl: temples turtle file is too small" 1>&2
	exit 0
else
	duck -r -y -e upload --synchronize ftps://romerese@ftp.romeresearchgroup.org/public_html/items/temples.ttl "$src/temples.ttl"; if [ $? -eq 0 ]; then echo "$(date +%Y-%m-%d\ %H:%M:%S) temples turtle FTPed to server." 1>&2; else echo "$(date +%Y-%m-%d\ %H:%M:%S) temples turtle FTP update failed!" 1>&2; fi
fi

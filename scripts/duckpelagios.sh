#!/bin/bash

# Pushes updated temples json to site
# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Path to include Cyberduck's duck command for running via launchctl
export PATH="/opt/homebrew/bin:$PATH"

# Wait a bit to give time for pelagios file to be created
sleep 30

set -e
# If file is big enough, Upload via FTP and log success or failure
fsize=`stat -f%z "$src/pelagios.json"`
if [ $fsize -lt 10000 ]
then
	echo "$(date +%Y-%m-%d\ %H:%M:%S) duckpelagios: temples pelagios json file is too small to upload" 1>&2
	exit 0
else
	duck -r -y -e upload --synchronize ftps://romerese@ftp.romeresearchgroup.org/public_html/items/pelagios.json "$src/pelagios.json"; if [ $? -eq 0 ]; then echo "$(date +%Y-%m-%d\ %H:%M:%S) temples json FTPed to server." 1>&2; else echo "$(date +%Y-%m-%d\ %H:%M:%S) temples json FTP update failed!" 1>&2; fi
fi

#!/bin/bash

# Pushes updated general temple bibliography to site
# Set up some variables
me=$(whoami)
src="/Users/$me/Documents/github/local/temples"

# Path to include Cyberduck's duck command for running via launchctl
export PATH="/usr/local/bin:$PATH"

# If file is big enough, Upload via FTP and log success or failure
fsize=`stat -f%z "$src/temple_bib_general.html"`
if [ $fsize -lt 500 ]
then
	echo "$(date +%Y-%m-%d\ %H:%M:%S) general temple bibliography file is too small" 1>&2
	exit 0
else
	duck -r -y -e upload --synchronize ftps://romerese@ftp.romeresearchgroup.org/public_html/temples/temple_bib_general.html "$src/temple_bib_general.html"; if [ $? -eq 0 ]; then echo "$(date +%Y-%m-%d\ %H:%M:%S) general temple bibliography FTPed to site." 1>&2; else echo "$(date +%Y-%m-%d\ %H:%M:%S) general temple bibliography FTP update failed!" 1>&2; fi
fi

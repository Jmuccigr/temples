#!/bin/bash

# Pushes updated turtle to site
# Set up some variables
me=$USER
src="/Users/$me/Documents/github/local/temples"

# Path to include Cyberduck's duck command for running via launchctl
export PATH="/opt/homebrew/bin:$PATH"

# If file is big enough, Upload via FTP and log success or failure
fsize=`stat -f%z "$src/sitemap.txt"`
if [ $fsize -lt 10000 ]
then
	echo "$(date +%Y-%m-%d\ %H:%M:%S) sitemap file is too small" 1>&2
	exit 0
else
	duck -r -y -e upload --synchronize ftps://romerese@ftp.romeresearchgroup.org/public_html/sitemap.txt "$src/sitemap.txt"; if [ $? -eq 0 ]; then echo "$(date +%Y-%m-%d\ %H:%M:%S) sitemap FTPed to server." 1>&2; else echo "$(date +%Y-%m-%d\ %H:%M:%S) sitemap FTP update failed!" 1>&2; fi
fi

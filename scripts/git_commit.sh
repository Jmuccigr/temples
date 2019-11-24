#!/bin/bash

# Commits some files to github.

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
counter=0

# Commit the various temple-db output files to git if they've changed
gitList=$(cd "$dest"; git status -s)

# Leaving out temples.json temples.csv maps/temples.json maps/temples.js
# so that they can have more meaningful commit messages
for f in sheet.csv citations.csv bibliography.csv temple_bib.html temple_bib.json
do
	gitItem=$(echo "$gitList" | grep -e " M $f")
	if [ ${#gitItem} -ne 0 ]
		then if [ -s "$dest/$f" ]
		then
    		echo "$(date +%Y-%m-%d\ %H:%M:%S) $f pushed to github" 1>&2
	    	cd "$dest"; git commit -m 'Automated update' $f
		    ((counter++))
		fi
	fi
done

echo "$(date +%Y-%m-%d\ %H:%M:%S) $counter total temple-db changes pushed to github." 1>&2

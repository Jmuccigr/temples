#!/bin/bash

# Commits some files to github.

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"
counter=0

# Commit the various temple-db output files to git if they've changed
gitList=$(cd "$dest"; git status -s)

for f in temples.json temples.csv maps/temples.json maps/temples.js
do
	gitItem=$(echo "$gitList" | grep -e '^ M $f$')
	if [ ${#gitItem} -ne 0 ] 
		then echo "$(date +%Y-%m-%d\ %H:%M:%S) $f pushed to github" 1>&2
		cd "$dest"; git commit -m 'Regular update' $f
		((counter++))
	fi
done

echo "$(date +%Y-%m-%d\ %H:%M:%S) $counter temple-db changes pushed to github." 1>&2

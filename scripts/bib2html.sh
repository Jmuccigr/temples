#!/bin/bash

# Converts Zotero-produced json bib file into html

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"

# Path to include homebrew stuff like jq for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Extract the article IDs from the json file and massage them into the right form.
refs=$(jq --raw-output '.[].id' "$dest/temple_bib.json" | sed -e 's/^/@/' | perl -pe 's/\n/, /')

# Pad them out so that they're YAML with a 'nocite' metadata field
# and send them to pandoc for conversion to HTML which gets written to a file
echo "---
nocite: |
  $refs
...
" | pandoc --filter pandoc-citeproc --bibliography="$dest/temple_bib.json" -o "$dest/temple_bib.html"
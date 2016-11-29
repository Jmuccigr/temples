#!/bin/bash

# Converts Zotero-produced json bib file into html

# Set up some variables
me=$(whoami)
dest="/Users/$me/Documents/github/local/temples"

# Path to include homebrew stuff like pandoc for running via launchctl
export PATH="/usr/local/bin:$PATH"

# Convert the json file to yaml for pandoc-citeproc.
refs=$(pandoc-citeproc -y "$dest/temple_bib.json")

# Add the 'nocite' metadata field & send them to pandoc for conversion to an HTML file
echo "$refs
---
nocite: |
  '@*'
...
" | pandoc --filter pandoc-citeproc -s -o "$dest/temple_bib.html"

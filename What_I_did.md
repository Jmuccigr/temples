---
author: John D. Muccigrosso
title: What I did
date: Saturday, 25 June 2016
---

# What I did

## Getting the temples

The existing on-line databases of [Pleiades](http://pleiades.stoa.org/), [DARE](http://dare.ht.lu.se) and [Vici.org](http://vici.org/) all contain at least some temples, but many of the places labeled as "temples" aren't. Some of this seems to come from the Barrington Atlas's practice. Nevertheless it's worth getting their list to save some work on our end and so that we can more easily contribute back to them.

### Vici.org

1. Download the database via <http://vici.org/data.php>.
1. From the items with a kind of "temple", extract the interesting info (and save it to a file): `jq '.' vici.json | jq '.features[]' | jq 'select (.properties.kind == "temple")' | jq '[.properties.title, .geometry.coordinates[1], .geometry.coordinates[0], .properties.id, .properties.extIds, .properties.summary'] | jq '@csv' > vici.csv`
1. Each line is quoted, and field-delimiting quotation marks are all escaped, so fix that: `cat vici.csv | sed 's/^"//g' | sed 's/"$//g' | sed 's/\\"/"/g' > vici_clean.csv`
1. Open the resulting file in OpenOffice and give it a header row. There are 1,859 lines in this file.
1. Remove the non-temple "temples":
	- 164 items had "church" in the title field. Deleted.
	- 14 items with "synagogue" (one "sysnagoge") in the title field. Deleted.
	- 13 items with "nuraghe" in the title field. Deleted.
	- 131 items with "church" but not "temp" in the summary field (here called "notes"). Deleted.
	- 47 items with "basili" and "Christi" but not "temp" in the summary field. Deleted.
	- 42 items with "basili" but not "temp" in the summary field. Deleted.
	- 14 items with "Christ" but not "temp" in the summary field. Deleted.
	- 62 items with "monast" but not "temp" in the summary field. Deleted.
	- 8 items with "monast" in the title field. Deleted.
	- 10 items with "basil" in the title field but not "temp" in the summary field. Deleted.
	- 13 items with "nuraghe" in the summary field. Deleted.
	- 8 items with "ziggurat" in the title field. Deleted.
	- 4 items with "ziggurat" in the summary field. Deleted.
	- 5 items with "martyr" in the title or summary field. Deleted.
	- 8 items with "synagogue" in the summary field. Deleted.

This leaves 1,329 items. Some of them also have Pleiades or dare or other IDs, but the API doesn't return that information (among other) unless only one item is requested at a time via `http://vici.org/object.php?id=<number>`, so I wrote a little AppleScript to do that. (See elsewhere in this repository.) Using lookups in OpenOffice, I connected the external IDs with each entry.

### Pleiades

Pleiades doesn't have search via their API, but they do provide downloads of the entire database [here](http://pleiades.stoa.org/downloads). With that data: 

1. Selected only the items with a *featureType* of "temple" for 453 items. A quick look shows that a lot of these are—unsurprisingly—not temples.
	- 30 items with "tomb" in the title field. Deleted.
	- 2 items with "church" in the title field. Deleted. (One ambiguous item left: ID 638753, which seems to be a temple at Aphrodisias.)
 	- 16 items with "nura" (for nuraghe/nuraxi) in the title field. Deleted.
	- 2 items with "arch" in the title field. Deleted.
	- 18 items with "pyramid" in the title field. Deleted.
	- 1 item with "ziggurat" in the title field. Deleted.
	- 2 items with "basilica" in the title field. Deleted.
	- 9 items with "mausol" in the title field. Deleted.
	- 5 items with "alignment" in the title field. Deleted.
	- 3 items with "amphi" in the title field. Deleted.
	- 2 items with "obelisk" in the title field. Deleted.
	- 6 items with "tumulus" in the title field. Deleted.
	- 36 others with obvious items in the title field (like "dolmen"). Deleted.

That leaves 308 items. A number of them have only "DARE location" as their title, so I got the more descriptive title via `http://pleiades.stoa.org/places/<number>/json` in another AppleScript. (Again, see elsewhere in this repository.)

### DARE - Digital Atlas of the Rome Empire

I downloaded all the items with a type of "temple" (type id 61) using `curl -s -stdout http://dare.ht.lu.se/api/geojson.php?typeid=61`, resulting in 1,465 items. This doesn't provide all the info in the database, so I downloaded the more detailed info for each item, using the IDs I just got: `curl -s -stdout http://vici.org/object.php?id=<###>`, and saved them to a file where I could merge them with the data I already had. The info I've obtained so far is less detailed than that from Pleiades or Vici.org, so I'm not sure how many of these are not really temples.

### Location, location, location

To help prioritize our own work on these various items, I used Google's API to find the modern countries and cities (localities) all the items belong to, based on their coordinates (except for DARE, which provides country data via the API). Again, another Applescript using the API as documented in the much upvoted first comment here: <http://stackoverflow.com/questions/6159074/given-the-lat-long-coordinates-how-can-we-find-out-the-city-country>.

### Moving them into our database

1. Copied 26 vici.org sites that are in Rome into our Google doc. None had a Pleiades or DARE ID.
1. Copied 17 Pleiades sites that are in Rome into our Google doc. None had a Pleiades or DARE ID.
1. Copied 22 DARE sites that are in Rome into our Google doc. 9 had a Pleiades ID.
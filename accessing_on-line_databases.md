---
author: John D. Muccigrosso
title: Accessing on-line databases
date: Sunday, 26 June 2016
...

# DARE

All info about downloading here: <http://imperium.ahlfeldt.se/print.php?doc=info_api>. Get an item by:

- ID: `curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php?id=<###>`
- Pleiades ID: `curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php?pleiades=<pleiadesid>`
- location: `curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php?point=<lon,lat>`
- type: `curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php&typeid=<typeid>`
- country: `curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php&cc=<countrycode>`

# Vici.org

Get an item by:

- ID: `http://vici.org/object.php?id=<###>`
	- NB "Currently not all available data is returned"
- Location: `http://vici.org/data.php?bounds=38.0,-7.0,40.0,-5.0&zoom=11`
	- The area is defined by two corners of 'bounds' (latitude, longitude of south-west point, latitude, longitude of north-east point). The higher the value of 'zoom', the more 'detail' markers are returned.

Get the whole thing: `curl -s http://vici.org/data.php`

Force annotations from a particular language (en, nl, de, fr): `http://vici.org/object.php?id=45&lang=nl` 

# Pleiades

Get an item by:

- ID: `curl -s -stdout http://pleiades.stoa.org/places/<###>/json`

Get the whole thing via daily dump at <https://atlantides.org/downloads/pleiades/json/> or <https://atlantides.org/downloads/pleiades/dumps/>.

# ADS: [The Rural Settlement of Roman Britain: an online resource](https://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=3031)

Get the whole thing via an [advanced search query](http://archaeologydataservice.ac.uk/archives/view/romangl/query.cfm?queryType=structured) for minor sites that are Romano-Celtic temples. Use the R script [here](https://www.reddit.com/r/rstats/comments/5yao7z/how_to_convert_coordinates_from_osgb_to_wgs84/) to convert the OSGB geographical data into latitude and longitude values. Most of the other values in the download did not have obvious analogues in the database.

Get an item by:

- ID: `curl -s -stdout http://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=<###>`

Tuesday, 7 January 2020 Update: the items seem to have moved to a secure server (https, not http):

- ID: `curl -s -stdout https://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=<####>`

# ToposText

Download the [entire database as ttl](https://topostext.org/downloads/pelagios.ttl) via their [download page](https://topostext.org/TT-downloads).

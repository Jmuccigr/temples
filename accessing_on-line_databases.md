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

Get the whole thing via daily dump at <http://atlantides.org/downloads/pleiades/json/> or <http://atlantides.org/downloads/pleiades/dumps/>.
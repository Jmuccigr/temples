# maps
Various maps of the temple data.

## List of files

- README.md - This file.
- DARE_temples.json - Digital Atlas of the Rome Empire's (DARE) listing of all items with an ID of 61 ("temple"). Formatted with python's json.tool after retrieval with
	- `curl --silent http://dare.ht.lu.se/api/geojson.php?typeid=61`
- DARE_temples_IT.json - DARE's listing of all items with an ID of 61 ("temple") in Italy. Formatted with python's json.tool after retrieval with
	- `curl --silent http://dare.ht.lu.se/api/geojson.php?"typeid=61&cc=IT"`
- temples.json - a GeoJSON-formatted list of temples from our Google sheet
- temples.js - temples.json as a javascript, automatically generated

## List of folders

- icons - some local icon files
- scripts - mapping-related scripts
- scripts_for_sql - same set of scripts, but adapted to pull data from mysql database, not a static file. Currently synced with romeresearchgroup.org.

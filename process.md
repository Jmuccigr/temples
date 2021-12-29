---
- title: How it works
- author: John D. Muccigrosso
- date: 2021-12-28
...

All these use a special log file that shows up in Console.app.

## Bibliography (specific)

Handling the reference works for specific temples.

1. Manual export of temple_bib group from Zotero as CLS_JSON file `temple_bib.json`.
2. `local.bib2html.plist` runs `bib2html.sh` when `temple_bib.json` gets updated.
3. `bib2html.sh` converts `temple_bib.json` into html file of complete biblio `temple_bib.html` and a csv for uploading to the database `bibliography.csv`.
4. `bib2html.sh` also checks for and logs any entries in the citations file `citations.csv` that are not in `temple_bib.json`.
5. Updated `bibliography.csv`, `temple_bib.html`, and `temple_bib.json` are pushed to GitHub by `gitcommit.sh`.

## Bibliography (general)

Handling the reference works for temples in general.

1. Manual export of temple_bib_general group from Zotero as CLS_JSON file `temple_bib_general.json`.
2. `temple_bib_general.json` gets backed up to GitHub.
3. WordPress ZotPress pulls temple_bib_general group from Zotero directly for insertion into a web page.
4. Former process:
    1. `local.genbib2html.plist` runs `gen_bib2html.sh` when `temple_bib_general.json` gets updated.
    2. `genbib2html.sh` converts `temple_bib_general.json` into html file `temple_bib_general.html`.
    3. `com.john.duckgentemplebib.plist` uploads updated `temple_bib_general.html` to the website via FTP.

## Citations

Handling the citations that connect reference works to temples.

1. Every 3,600 seconds (= 1 hour), `local.ggl2cites.plist` launches `ggl2cites.sh`.
2. `ggl2cites.sh` downloads the citation list from the Google spreadsheet, cleans it a little, and saves it as `sheet.csv`, but only if it has changed from the previous download.
3. Updated `citations.csv` is pushed to GitHub by `gitcommit.sh`.

## Temples

Handling the temples.

1. Every 3,600 seconds (= 1 hour), `local.ggl2geojson.plist` launches `ggl2geojson.sh`.
2. `ggl2geojson.sh` downloads the temple list from the Google spreadsheet, cleans it a little, and saves it as `sheet.csv`, but only if it has changed from the previous download.
    - Updated `sheet.csv` is pushed to GitHub by `gitcommit.sh`.
3. `ggl2cites.sh` calls `ogr2ogr` to convert csv to temporary geojson file `sheet.json` which then gets cleaned up to `temples.json`. (Other utilities skip entries with empty coordinates.)
4. `ggl2cites.sh` turns `temples.json` into separate features for pelagios `pelagios.json`, and a version containing only the entries with coordinates for mapping in the `maps` sub-directory.
5. `json2csv.sh` turns `temples.json` into `temples.csv` with some minor cleaning.
    - 
6. `local.json2ttl.plist` runs `json2ttl.py` when `pelagios.json` is updated.
7. `json2ttl.py` uses `pelagios.json` to create a turtle file `temples.ttl`.
    - `local.duckttl.plist` runs `duckttl.sh` when `temples.ttl` has been updated, which uploads it to the website for pelagios.
    - `local.sitemap.plist` runs `sitemap_update.sh` when `temples.ttl` has been updated, which converts it to `sitemap.txt`, a simple list of temple IDs.
    - `com.john.ducksitemap.plist` runs `ducksitemap.sh` when `sitemap.txt` has been updated, which uploads it to the website for Google to consume.
8. `local.duckpelagios.plist` runs `duckpelagios.sh` when `pelagios.json` is updated, which uploads it to the website.

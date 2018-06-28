#!/usr/local/bin/python

import json
import rdflib
import io
import re

outputText = u''
outputText += u'@prefix dcterms: <http://purl.org/dc/terms/> .\n'
outputText += u'@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n'
outputText += u'@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n'
outputText += u'@prefix gn: <http://www.geonames.org/ontology#> .\n'
outputText += u'@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .\n'
outputText += u'@prefix lawd: <http://lawd.info/ontology/> .\n'
outputText += u'@prefix osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/> .\n'
outputText += u'@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n'
outputText += u'@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n'
outputText += u'@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n'


basedir='/Users/john_muccigrosso/Documents/github/local/temples/'
with io.open(basedir + 'pelagios.json', encoding="utf-8") as f:
    for line in f.readlines():
        record = json.loads(line)
        if 'properties' in record.keys():
            outputText += u'<http://romeresearchgroup.org/items/' + record['properties']['id'] + '> a lawd:Place ;\n'
            outputText += u'lawd:hasName [ lawd:primaryForm "' + (record['properties']['name']).replace('"', '\\"') + '" ] ;\n'
            if record['properties']['vici.org'] != '':
                outputText += 'skos:exactMatch <http://vici.org/object.php?id=' + record['properties']['vici.org'] + '> ;\n'
            if record['properties']['pleiades'] != '':
                outputText += 'skos:exactMatch <http://pleiades.stoa.org/places/' + record['properties']['pleiades'] + '> ;\n'
            if record['properties']['dare'] != '':
                outputText += 'skos:exactMatch <http://dare.ht.lu.se/api/geojson.php?id=' + record['properties']['dare'] + '> ;\n'
            if record['properties']['arachne'] != '':
                outputText += 'skos:exactMatch <https://arachne.dainst.org/entity/' + record['properties']['arachne'] + '> ;\n'
            if record['properties']['livius'] != '':
                outputText += 'skos:exactMatch <http://www.livius.org/articles/place/' + record['properties']['livius'] + '/> ;\n'
            if record['properties']['digitalesforumromanum'] != '':
                outputText += 'skos:exactMatch <http://www.digitales-forum-romanum.de/gebaeude/' + record['properties']['digitalesforumromanum'] + '/> ;\n'
            if record['properties']['trismegistos'] != '':
                outputText += 'skos:exactMatch <http://www.trismegistos.org/place/' + record['properties']['trismegistos'] + '> ;\n'
            if record['properties']['wikipedia'] != '':
                outputText += 'skos:exactMatch <href="https://en.wikipedia.org/wiki/' + record['properties']['wikipedia'] + '"> ;\n'
                outputText = re.sub(r"en(\.wikipedia\.org/wiki/)([a-z][a-z])=", r"\2\1", outputText)
            if record['properties']['wikidata'] != '':
                outputText += 'skos:exactMatch <https://www.wikidata.org/wiki/' + record['properties']['wikidata'] + '> ;\n'
            if record['properties']['ads'] != '':
                outputText += 'skos:exactMatch <http://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=' + record['properties']['ads'] + '> ;\n'
            if record['geometry']['coordinates'][0] != '':
                prefLoc = record['geometry']
                coords = prefLoc['coordinates']
                outputText += u'geo:location [ geo:lat "' + str(coords[1]) + '"^^xsd:double ; geo:long "' + str(coords[0]) + '"^^xsd:double ] ;\n'
            if record['properties']['country'] != '':
                outputText += 'gn:countryCode "' + record['properties']['country'] + '" ;\n'
            outputText += u'dcterms:subject "temple"  ;\n'
            outputText += u'.\n'

output = io.open(basedir + 'temples.ttl', 'w', encoding="utf-8")
output.write(outputText)

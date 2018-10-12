#!/usr/local/bin/python3

import json
#import rdflib
import io
import re
import os
import datetime

me = os.getenv("USER")

outputText = u''
outputText += u'@prefix void: <http://rdfs.org/ns/void#> .\n'
outputText += u'@prefix dcterms: <http://purl.org/dc/terms/> .\n'
outputText += u'@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n'
outputText += u'@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n'
outputText += u'@prefix gn: <http://www.geonames.org/ontology#> .\n'
outputText += u'@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .\n'
outputText += u'@prefix lawd: <http://lawd.info/ontology/> .\n'
outputText += u'@prefix osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/> .\n'
outputText += u'@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n'
outputText += u'@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n'
outputText += u'@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n'
outputText += u'@prefix owl: <http://www.w3.org/2002/07/owl#> .\n'
outputText += u'@prefix viaf: <http://viaf.org/viaf/> .\n'
outputText += u'@prefix spatial: <http://geovocab.org/spatial#> .\n'
outputText += u'@prefix pleiades: <https://pleiades.stoa.org/places/vocab#> .\n'
outputText += u'@prefix aat: <http://vocab.getty.edu/aat/> .\n'
outputText += u'@prefix ov: <http://open.vocab.org/terms/> .\n\n'

outputText += u'<http://romeresearchgroup.org/items/temples.ttl> a void:dataDump ; \n'
outputText += u'    dcterms:title "Database of Temples of the Classical World" ;  \n'
outputText += u'    dcterms:creator viaf:309849093 ;  \n'
outputText += u'    foaf:homepage <https://romeresearchgroup.org/database-of-temples/> ;   \n'
outputText += u'    dcterms:description "A database of structures, extant and attested, identified as temples in the Classical World, broadly defined." ;  \n'
outputText += u'    dcterms:temporal "2016-2018" ;   \n'
outputText += u'    dcterms:modified "' + str(datetime.date.today()) + '"  ; \n'
outputText += u'    .  \n\n'

basedir = '/Users/' + me + '/Documents/github/local/temples/'
with io.open(basedir + 'pelagios.json', encoding="utf-8") as f:
    for line in f.readlines():
        record = json.loads(line)
        if 'properties' in record.keys():
            outputText += u'<http://romeresearchgroup.org/items/' + record['properties']['id'] + '> a lawd:Place ;\n'
#           Only one name for now, which needs rdfs, not lawd:hasName
#           outputText += u'lawd:hasName [ lawd:primaryForm "' + (record['properties']['name']).replace('"', '\\"') + '" ] ;\n'
#			A few names have escaped quotation marks. This retains them.
            outputText += u'rdfs:label "' + (record['properties']['name']).replace('"', '\\"') + '" ;\n'
#			These are overbroad dates, but better than nothing.
            outputText += u'dcterms:temporal "-750/640" ;\n'
            if record['geometry']['coordinates'][0] != '':
                prefLoc = record['geometry']
                coords = prefLoc['coordinates']
                outputText += u'geo:location [ geo:lat "' + str(coords[1]) + '"^^xsd:double ; geo:long "' + str(coords[0]) + '"^^xsd:double ] ;\n'
            if record['properties']['compass'] != '':
                dir = record['properties']['compass']
                if dir == 'N':
                    compassText = '300078759'
                elif dir == 'NE':
                    compassText = '300078809'
                elif dir == 'E':
                    compassText = '300078759'
                elif dir == 'SE':
                    compassText = '300078827'
                elif dir == 'S':
                    compassText = '300078825'
                elif dir == 'SW':
                    compassText = '300078829'
                elif dir == 'W':
                    compassText = '300078836'
                else:
                    compassText = '300078812'
                outputText += 'ov:compassDirection <http://vocab.getty.edu/page/aat/' + compassText + '> ;\n'
            if record['properties']['country'] != '':
                outputText += 'gn:countryCode "' + record['properties']['country'] + '" ;\n'
            outputText += u'dcterms:subject "temple"  ;\n'
            outputText += u'pleiades:hasFeatureType <https://pleiades.stoa.org/vocabularies/place-types/temple-2> ;\n'
            if record['properties']['vici'] != '':
                outputText += 'skos:exactMatch <http://vici.org/vici/' + record['properties']['vici'] + '> ;\n'
            if record['properties']['pleiades'] != '':
                outputText += 'skos:exactMatch <http://pleiades.stoa.org/places/' + record['properties']['pleiades'] + '> ;\n'
            if record['properties']['dare'] != '':
                outputText += 'skos:exactMatch <http://dare.ht.lu.se/places/' + record['properties']['dare'] + '> ;\n'
            if record['properties']['arachne'] != '':
                outputText += 'skos:exactMatch <https://arachne.dainst.org/entity/' + record['properties']['arachne'] + '> ;\n'
            if record['properties']['livius'] != '':
                outputText += 'skos:exactMatch <http://www.livius.org/articles/place/' + record['properties']['livius'] + '/> ;\n'
            if record['properties']['digitalesforumromanum'] != '':
                outputText += 'skos:exactMatch <http://www.digitales-forum-romanum.de/gebaeude/' + record['properties']['digitalesforumromanum'] + '/> ;\n'
            if record['properties']['trismegistos'] != '':
                outputText += 'skos:exactMatch <http://www.trismegistos.org/place/' + record['properties']['trismegistos'] + '> ;\n'
            if record['properties']['wikipedia'] != '':
#             	Some wikilinks from vici.org are to non-English wikipedias. This fixes the URL.
                wikiText = 'skos:exactMatch <href="https://en.wikipedia.org/wiki/' + record['properties']['wikipedia'] + '"> ;\n'
                wikiText = re.sub(r"en(\.wikipedia\.org/wiki/)([a-z][a-z])=", r"\2\1", wikiText)
                outputText += wikiText
            if record['properties']['wikidata'] != '':
                outputText += 'skos:exactMatch <https://www.wikidata.org/entity/' + record['properties']['wikidata'] + '> ;\n'
            if record['properties']['ads'] != '':
                outputText += 'skos:exactMatch <http://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=' + record['properties']['ads'] + '> ;\n'
            if record['properties']['cona'] != '':
                outputText += 'skos:exactMatch <http://vocab.getty.edu/page/cona/' + record['properties']['cona'] + '> ;\n'
            if record['properties']['topostext'] != '':
                outputText += 'skos:exactMatch <https://topostext.org/place/' + record['properties']['topostext'] + '> ;\n'
#             if record['properties']['ancientPlace'] != '':
#            		outputText += u'owl:locatedIn <http://pleiades.stoa.org/places/' + record['properties']['ancientPlace'] + '> ;\n'
#            		outputText += u'spatial:P <http://pleiades.stoa.org/places/' + record['properties']['ancientPlace'] + '> ;\n'
            outputText += u'.\n'

output = io.open(basedir + 'temples.ttl', 'w', encoding="utf-8")
output.write(outputText)

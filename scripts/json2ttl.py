#!/usr/local/bin/python

import json
import rdflib
import io

basedir='/Users/john_muccigrosso/Documents/github/local/temples/'
with io.open(basedir + 'pelagios.json', encoding="utf-8") as f:
    output = io.open(basedir + 'temples.ttl', 'w', encoding="utf-8")
    output.write(u'@prefix dcterms: <http://purl.org/dc/terms/> .\n')
    output.write(u'@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n')
    output.write(u'@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n')
    output.write(u'@prefix gn: <http://www.geonames.org/ontology#> .\n')
    output.write(u'@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .\n')
    output.write(u'@prefix lawd: <http://lawd.info/ontology/> .\n')
    output.write(u'@prefix osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/> .\n')
    output.write(u'@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n')
    output.write(u'@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n')
    output.write(u'@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n')

    for line in f.readlines():
        record = json.loads(line)
        if 'properties' in record.keys():
            output.write(u'<http://romeresearchgroup.org/items/' + record['properties']['id'] + '> a lawd:Place ;\n')
            output.write(u'lawd:hasName [ lawd:primaryForm "' + (record['properties']['name']) + '" ] ;\n')
            if record['properties']['vici.org'] != '':
                output.write ('skos:exactMatch <http://vici.org/object.php?id=' + record['properties']['vici.org'] + '> ;\n')
            if record['properties']['pleiades'] != '':
                output.write ('skos:exactMatch <http://pleiades.stoa.org/places/' + record['properties']['pleiades'] + '> ;\n')
            if record['properties']['dare'] != '':
                output.write ('skos:exactMatch <http://dare.ht.lu.se/api/geojson.php?id=' + record['properties']['dare'] + '> ;\n')
            if record['properties']['arachne'] != '':
                output.write ('skos:exactMatch <https://arachne.dainst.org/entity/' + record['properties']['arachne'] + '> ;\n')
            if record['properties']['livius'] != '':
                output.write ('skos:exactMatch <http://www.livius.org/articles/place/' + record['properties']['livius'] + '/> ;\n')
            if record['properties']['digitalesforumromanum'] != '':
                output.write ('skos:exactMatch <http://www.digitales-forum-romanum.de/gebaeude/' + record['properties']['digitalesforumromanum'] + '/> ;\n')
            if record['properties']['trismegistos'] != '':
                output.write ('skos:exactMatch <http://www.trismegistos.org/place/' + record['properties']['trismegistos'] + '> ;\n')
            if record['properties']['wikipedia'] != '':
                output.write ('skos:exactMatch <href="https://en.wikipedia.org/wiki/' + record['properties']['wikipedia'] + '> ;\n')
            if record['properties']['wikidata'] != '':
                output.write ('skos:exactMatch <https://www.wikidata.org/wiki/' + record['properties']['wikidata'] + '> ;\n')
            if record['properties']['ads'] != '':
                output.write ('skos:exactMatch <http://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=' + record['properties']['ads'] + '> ;\n')
            if record['geometry']['coordinates'][0] != '':
                prefLoc = record['geometry']
                coords = prefLoc['coordinates']
                output.write(u'geo:location [ geo:lat "' + str(coords[1]) + '"^^xsd:double ; geo:long "' + str(coords[0]) + '"^^xsd:double ] ;\n')
            if record['properties']['country'] != '':
                output.write ('gn:countryCode "' + record['properties']['country'] + '" ;\n')
            output.write(u'dcterms:subject "temple"  ;\n');
            output.write(u'.\n')

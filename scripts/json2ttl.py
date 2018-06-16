import json

with open('test.geojson') as f:
  output = open('dai.ttl', 'w')

  output.write('@prefix dcterms: <http://purl.org/dc/terms/> .\n')
  output.write('@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n')
  output.write('@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n')
  output.write('@prefix geosparql: <http://www.opengis.net/ont/geosparql#> .\n')
  output.write('@prefix lawd: <http://lawd.info/ontology/> .\n')
  output.write('@prefix osgeo: <http://data.ordnancesurvey.co.uk/ontology/geometry/> .\n')
  output.write('@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n')
  output.write('@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n')
  output.write('@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n\n')

  for line in f.readlines():
    record = json.loads(line)

    if 'prefName' in record.keys():
      output.write('<' + record['@id'] + '> a lawd:Place ;\n')
      output.write('  rdfs:label "' + (record['prefName']['title']).encode('utf8').replace('"','\'').replace('\\','') + '" ;\n')

      if 'names' in record.keys():
        for name in record['names']:
          if 'language' in name.keys() and 1 < len(name['language']) < 4:
            output.write(  '  lawd:hasName [ lawd:primaryForm "' + (name['title']).encode('utf8').replace('"','\'').replace('\\','')  + '"@' + (name['language']).encode('utf8') + ' ] ;\n')
          else:
            output.write(  '  lawd:hasName [ lawd:primaryForm "' + (name['title']).encode('utf8').replace('"','\'').replace('\\','')  + '" ] ;\n')

      if 'links' in record.keys():
        for link in record['links']:
          output.write('  skos:closeMatch <' + (link['object']).encode('utf8') + '> ;\n')

      if 'prefLocation' in record.keys():
        prefLoc = record['prefLocation']
        if 'shape' in prefLoc:
          output.write('  geosparql:hasGeometry [ osgeo:asGeoJSON "{\\\"type\\\": \\\"MultiPolygon\\\", \\\"coordinates\\\": ' + str(prefLoc['shape']) + ' }" ] ;\n')
        elif 'coordinates' in prefLoc:
          coords = prefLoc['coordinates']
          output.write('  geo:location [ geo:lat "' + str(coords[1]) + '"^^xsd:double ; geo:long "' + str(coords[0]) + '"^^xsd:double ] ;\n')

      if 'parent' in record.keys():
        output.write('  dcterms:isPartOf <' + record['parent'] + '> ;\n')

      output.write('  .\n\n')

  output.close()

# From http://gis.stackexchange.com/questions/115733/converting-json-to-geojson-or-csv
# Convert json to geojson

def convert_json(items):
    import json
    return json.dumps({ "type": "FeatureCollection",
                        "features": [ 
                                        {"type": "Feature",
                                         "geometry": { "type": "Point",
                                                       "coordinates": [ feature['longitude'],
                                                                        feature['latitude']]},
                                         "properties": { key: value 
                                                         for key, value in feature.items()
                                                         if key not in ('latitude', 'longitude') }
                                         } 
                                     for feature in json.loads(items)
                                    ]
                       })
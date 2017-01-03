// From http://jsfiddle.net/erictheise/HQhzr/22/ 
// replying to http://gis.stackexchange.com/questions/65964/how-can-i-change-the-style-of-marker-in-leaflet-from-geojson
// First have some geojson to work with
var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.1966, 31.7825]
        },
        "properties": {
            "GPSId": "2",
            "DateTime": "7/3/2013 4:47:15 PM",
            "GPSUserName": "2",
            "GPSUserColor": "#FF5500"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.2, 31.780117]
        },
        "properties": {
            "GPSId": "6",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake1",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.201715, 31.779548]
        },
        "properties": {
            "GPSId": "15",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake10",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200987, 31.779606]
        },
        "properties": {
            "GPSId": "16",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake11",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200987, 31.780522]
        },
        "properties": {
            "GPSId": "17",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake12",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.201435, 31.780981]
        },
        "properties": {
            "GPSId": "18",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake13",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200806, 31.781145]
        },
        "properties": {
            "GPSId": "19",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake14",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200856, 31.780188]
        },
        "properties": {
            "GPSId": "20",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake15",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200145, 31.780276]
        },
        "properties": {
            "GPSId": "21",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake16",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.201517, 31.780699]
        },
        "properties": {
            "GPSId": "22",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake17",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.20321, 31.780133]
        },
        "properties": {
            "GPSId": "23",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake18",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.199852, 31.78034]
        },
        "properties": {
            "GPSId": "7",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake2",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200613, 31.780117]
        },
        "properties": {
            "GPSId": "8",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake3",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200613, 31.780691]
        },
        "properties": {
            "GPSId": "9",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake4",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.199326, 31.780789]
        },
        "properties": {
            "GPSId": "10",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake5",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.19999, 31.780965]
        },
        "properties": {
            "GPSId": "11",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake6",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.201142, 31.780699]
        },
        "properties": {
            "GPSId": "12",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake7",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.201312, 31.780511]
        },
        "properties": {
            "GPSId": "13",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake8",
            "GPSUserColor": "#00FF57"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [35.200642, 31.780109]
        },
        "properties": {
            "GPSId": "14",
            "DateTime": "7/12/2013 9:05:00 AM",
            "GPSUserName": "fake9",
            "GPSUserColor": "#00FF57"
        }
    }],
    "name": "Points",
    "keyField": "GPSUserName"
};

// Then do some leaflet stuff
var map = L.map('map').setView([31.780109, 35.200642], 15);
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);
geojsonLayer = L.geoJson(geojson, {
    style: function(feature) {
        return {
            color: feature.properties.GPSUserColor
        };
    },
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
            radius: 10,
            fillOpacity: 0.85
        });
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.GPSUserName);
    }
});
map.addLayer(geojsonLayer);

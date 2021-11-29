function layer_by_orientation() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        templesN.addData(data);
        templesNE.addData(data);
        templesE.addData(data);
        templesSE.addData(data);
        templesS.addData(data);
        templesSW.addData(data);
        templesW.addData(data);
        templesNW.addData(data);
        templesUnknown.addData(data);
        allPoints = data.features;
    });

    // Save the currently visible basemap & walls
    for (i in baseLayers) {
        if (map.hasLayer(baseLayers[i]) == true) {
            currentMap = baseLayers[i]
        };
    }
	if (map.hasLayer(aurelian) == true) {
		hasWalls = true;
	} else {
		hasWalls = false;
	}

    // Remove existing layers & controls
    clearLayers();
	clearControls();

    // Define layers for the various kinds of monuments in temples.js
    var north = new L.LayerGroup(),
    	northeast = new L.LayerGroup(),
    	east = new L.LayerGroup(),
    	southeast = new L.LayerGroup(),
    	south = new L.LayerGroup(),
    	southwest = new L.LayerGroup(),
    	west = new L.LayerGroup(),
    	northwest = new L.LayerGroup(),
        unknown = new L.LayerGroup();

    // Set the offset value for the tooltip
    oset = 0;

   templesN = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "N");
        }
    }).addTo(north);

   templesNE = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "NE");
        }
    }).addTo(northeast);

   templesE = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "E");
        }
    }).addTo(east);

   templesSE = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "SE");
        }
    }).addTo(southeast);

   templesS = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "S");
        }
    }).addTo(south);

   templesSW = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "SW");
        }
    }).addTo(southwest);

   templesW = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "W");
        }
    }).addTo(west);

   templesNW = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                riseOnHover: true,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "NW");
        }
    }).addTo(northwest);

   templesUnknown = new L.geoJson(null, {
		onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: circleIcon,
                riseOnHover: true
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.compass === "");
        }
    }).addTo(unknown);

    var overlays = {
        "North": north,
        "Northeast": northeast,
        "East": east,
        "Southeast": southeast,
        "South": south,
        "Southwest": southwest,
        "West": west,
        "Northwest": northwest,
        "Unknown": unknown
    };

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays, {
        collapsed: false,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);
    // Now add the overlays
    map.addLayer(north);
    map.addLayer(northeast);
    map.addLayer(east);
    map.addLayer(southeast);
    map.addLayer(south);
    map.addLayer(southwest);
    map.addLayer(west);
    map.addLayer(northwest);
    map.addLayer(unknown);

	// Add back the wall, if needed
	if (hasWalls) {
		map.addLayer(walls);
	}
	;
}

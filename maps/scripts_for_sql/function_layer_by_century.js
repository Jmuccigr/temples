function layer_by_century() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        temples1.addData(data);
        temples2.addData(data);
        temples3.addData(data);
        temples4.addData(data);
        temples5.addData(data);
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
    var first = new L.LayerGroup(),
        second = new L.LayerGroup(),
        third = new L.LayerGroup(),
        fourth = new L.LayerGroup(),
        fifth = new L.LayerGroup();

    // Set the offset value for the tooltip
    oset = -28;

   temples1 = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: blackCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: blackIcon,
                riseOnHover: true
            })
            };
        },
        filter: function (feature, layer) {
            return (feature.properties.century == "-1");
        }
    }).addTo(first);

   temples2 = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: greenCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: greenIcon,
                riseOnHover: true
            })
            };
        },
        filter: function (feature, layer) {
            return (feature.properties.century == "-2");
        }
    }).addTo(second);

   temples3 = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: greyCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: greyIcon,
                riseOnHover: true
            })
            };
        },
        filter: function (feature, layer) {
            return (feature.properties.century == "-3");
        }
    }).addTo(third);

   temples4 = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: blueCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: blueIcon,
                riseOnHover: true
            })
            };
        },
        filter: function (feature, layer) {
            return (feature.properties.century == "-4");
        }
    }).addTo(fourth);

   temples5 = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: redCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: redIcon,
                riseOnHover: true
            })
            };
        },
        filter: function (feature, layer) {
            return (feature.properties.century == "-5");
        }
    }).addTo(fifth);

    var overlays = {
        "<span style='color: black'>first c. BC</span>": first,
        "<span style='color: green'>second c. BC</span>": second,
        "<span style='color: grey'>third c. BC</span>": third,
        "<span style='color: blue'>fourth c. BC</span>": fourth,
        "<span style='color: red'>fifth c. BC</span>": fifth
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
    map.addLayer(first);
    map.addLayer(second);
    map.addLayer(third);
    map.addLayer(fourth);
    map.addLayer(fifth);

	// Add back the wall, if needed
	if (hasWalls) {
		map.addLayer(walls);
	}
	;

}


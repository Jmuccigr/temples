function layer_by_orientation() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        templesO.addData(data);
        templesN.addData(data);
    });

    // Save the currently visible basemap
    for (i in baseLayers) {
        if (map.hasLayer(baseLayers[i]) == true) {
            currentMap = baseLayers[i]
        };
    }

    // Remove existing layers & controls
    clearLayers();

    if (typeof ctl !== 'undefined') {
        map.removeControl(ctl);
    }

    // Define layers for the various kinds of monuments in temples.js
    var orientations = new L.LayerGroup(),
        none = new L.LayerGroup();

   templesO = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: arrowIcon,
                rotationAngle: feature.properties.orientation,
                rotationOrigin: 'center center'
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.orientation != "");
        }
    }).addTo(orientations);

   templesN = new L.geoJson(null, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.orientation)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: circleIcon
            })
        },
        filter: function (feature, layer) {
            return (feature.properties.orientation === "");
        }
    }).addTo(none);

    var overlays = {
        "Oriented": orientations,
        "Unknown": none
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
    map.addLayer(orientations);
    map.addLayer(none);
}

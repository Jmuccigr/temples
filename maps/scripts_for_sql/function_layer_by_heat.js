function layer_by_heat() {
    <!--  My datafile -->

    $.getJSON("scripts/json.php", function (data) {
        addDataToMap(data, map);
        allPoints = data.features;
    });

    // Save the currently visible basemap & walls
    // but switch to osm if it can't be seen at high zoom
    for (i in baseLayers) {
        if (map.hasLayer(baseLayers[i]) == true) {
            if (i == "Imperium" || i == "Ancient terrain") {
                currentMap = baseLayers["Modern streets"]
            } else {
                currentMap = baseLayers[i]
            }
        }
    }
	if (map.hasLayer(aurelian) == true) {
		hasWalls = true;
	} else {
		hasWalls = false;
	}

    // Remove existing layers & controls
    clearLayers();
	clearControls();

    // Load heatmap goodies and create layer
    geoJson2heat = function (geojson) {
        return geojson.features.map(function (feature) {
            return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
        });
    }

    function addDataToMap(data, map) {

        var geoData = geoJson2heat(data, 1);

        var heatMap = new L.heatLayer(geoData, {
            radius: 40,
            blur: 25,
            maxZoom: 17
        });

        // Now add the heatmap overlay
        map.addLayer(heatMap);
    }

    // Create empty variable for the control
    var overlays = {};

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays, {
        collapsed: false,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap)

	// Add back the wall, if needed
	if (hasWalls) {
		map.addLayer(walls);
	}
	;
}

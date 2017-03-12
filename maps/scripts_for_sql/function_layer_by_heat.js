function layer_by_heat() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        temples = data;
    });

var temples = {};

    // Save the currently visible basemap
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

    // Remove existing layers & controls
    clearLayers();

    if (typeof ctl !== 'undefined') {
        map.removeControl(ctl);
    }

    // Load heatmap goodies and create layer
    geoJson2heat = function (geojson) {
        alert (geojson);
        return geojson.features.map(function (feature) {
            return [parseFloat(feature.geometry.coordinates[1]), parseFloat(feature.geometry.coordinates[0])];
        });
    }

	var geoData = geoJson2heat(temples, 1);

    var heatMap = new L.heatLayer(geoData, {
        radius: 40,
        blur: 25,
        maxZoom: 17
    });

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

    // Now add the heatmap overlay
    map.addLayer(heatMap);

    // Zoom in and re-center around Rome or it won't be visible
    map.flyTo([41.893, 12.48], 14, {
        animate: true
    });
}

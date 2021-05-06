function layer_for_one_item() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        temples.addData(data);
        allPoints = data.features;
		get_item_data(filename);
    });

	// Save the currently visible basemap
    for (i in baseLayers) {
        if (map.hasLayer(baseLayers[i]) == true) {
            currentMap = baseLayers[i]
        };
    }
    // Remove existing layers & controls
    clearLayers();
	clearControls();

    // Define layers for the various kinds of monuments in temples.js
    var items = new L.LayerGroup();

    // Set the offset value for the tooltip
    oset = -28;

    temples = new L.geoJson(null, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            // Single item might not have a location, in which case don't add a point for it
            if (latlng != "LatLng(0, 0)") {
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
			};
        },
    }).addTo(items);

    var overlays = {};

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays, {
        collapsed: false,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);

    // Now add the overlays
    map.addLayer(items);

}

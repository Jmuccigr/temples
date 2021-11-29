function layer_by_type() {
    // My datafile
	$.getJSON("scripts/json.php", function (data) {
        temples.addData(data);
        mithrae.addData(data);
        sanctuaries.addData(data);
        tombs.addData(data);
        allPoints = data.features;
    });

    // Save the currently visible basemap & walls
    for (i in baseLayers)
    {
        if (map.hasLayer(baseLayers[i]) == true)
        {
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
    var m = new L.LayerGroup(),
        s = new L.LayerGroup(),
        t = new L.LayerGroup(),
        tb = new L.LayerGroup();

    // Set the offset value for the tooltip
    oset = -28;

   mithrae = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: blackIcon,
                riseOnHover: true
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "mithraeum");
        }
    }).addTo(m);

   sanctuaries = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: greenIcon,
                riseOnHover: true
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "sanctuary");
        }
    }).addTo(s);

   temples = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: greyIcon,
                riseOnHover: true
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "temple");
        }
    }).addTo(t);

   tombs = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: blueIcon,
                riseOnHover: true
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "tomb");
        }
    }).addTo(tb);

    var overlays = {
        "<span style='color: black'>mithraea</span>": m,
        "<span style='color: green'>sanctuaries</span>": s,
        "<span style='color: grey'>temples</span>": t,
        "<span style='color: blue'>tombs</span>": tb
    };

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays,
    {
        collapsed: false,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);
    // Now add the overlays
    map.addLayer(m);
    map.addLayer(s);
    map.addLayer(t);
    map.addLayer(tb);

	// Add back the wall, if needed
	if (hasWalls) {
		map.addLayer(walls);
	}
	;
}

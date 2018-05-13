function layer_by_sex_circleMarkers() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        templesM.addData(data);
        templesF.addData(data);
        templesB.addData(data);
        templesU.addData(data);
        allPoints = data.features;
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
    var m = new L.LayerGroup(),
        f = new L.LayerGroup(),
        b = new L.LayerGroup(),
        u = new L.LayerGroup();

    // Set the offset value for the tooltip
    oset = -28;

	// Variables for circleMarkers
	var fColor = "black",
        rad = 7,
        fOpacity = 1;

   templesM = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.circleMarker(latlng,
            {
                color: fColor,
                fillColor: "black",
                radius: rad,
                fillOpacity: fOpacity

            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "M");
        }
    }).addTo(m);

   templesF = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.circleMarker(latlng,
            {
                color: fColor,
                fillColor: "red",
                radius: rad,
                fillOpacity: fOpacity

            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "F");
        }
    }).addTo(f);

   templesB = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.circleMarker(latlng,
            {
                color: fColor,
                fillColor: "grey",
                radius: rad,
                fillOpacity: fOpacity

            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "M/F");
        }
    }).addTo(b);

   templesU = new L.geoJson(null,
    {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng)
        {
            return L.circleMarker(latlng,
            {
                color: fColor,
                fillColor: "white",
                radius: rad,
                fillOpacity: fOpacity

            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "");
        }
    }).addTo(u);

    var overlays = {
        "<span style='color: black'>Male</span>": m,
        "<span style='color: red'>Female</span>": f,
        "<span style='color: grey'>Both</span>": b,
        "<span style='color: black'>Unknown</span>": u
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
    map.addLayer(m);
    map.addLayer(f);
    map.addLayer(b);
    map.addLayer(u);
}

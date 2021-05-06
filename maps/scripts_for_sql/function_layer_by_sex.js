function layer_by_sex() {

<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        templesM.addData(data);
        templesF.addData(data);
        templesB.addData(data);
        templesU.addData(data);
        allPoints = data.features;
    });

// Save the currently visible basemap
    for (i in baseLayers)
    {
        if (map.hasLayer(baseLayers[i]) == true)
        {
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

   templesM = new L.geoJson(null,
    {
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
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: whiteCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: whiteIcon,
                riseOnHover: true
            })
            };
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
            if (feature.properties.geocertainty == "1") {
            return L.marker(latlng,
            {
                icon: BandWCircleIcon,
                riseOnHover: true
            })
            } else {
            return L.marker(latlng,
            {
                icon: BandWIcon,
                riseOnHover: true
            })
            };
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
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "");
        }
    }).addTo(u);

    var overlays = {
        "<span style='color: black'>Male</span>": m,
        "<span style='color: white;background-color: black'>Female</span>": f,
        "<span style='font-family: monospace'><span style='color: black'>B</span><span style='color: white;background-color: black'>o</span><span style='color: black'>t</span><span style='color: white;background-color: black'>h</span></span>": b,
        "<span style='color: gray'>Unknown</span>": u
    };

    // Make sure this is global so the control can be deleted by other scripts.
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
    map.addLayer(f);
    map.addLayer(b);
    map.addLayer(u);

}

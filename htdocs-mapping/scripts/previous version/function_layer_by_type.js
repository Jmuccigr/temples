function layer_by_type() {
<!--  My datafile -->
	$.getJSON("scripts/json.php", function (data) {
        temples.addData(data);
        mithrae.addData(data);
        sanctuaries.addData(data);
        tombs.addData(data);
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

    if (typeof ctl !== 'undefined')
    {
        map.removeControl(ctl);
    }

    // Define layers for the various kinds of monuments in temples.js
    var m = new L.LayerGroup(),
        s = new L.LayerGroup(),
        t = new L.LayerGroup(),
        tb = new L.LayerGroup();

   mithrae = new L.geoJson(null,
    {
        onEachFeature: function (feature, layer)
        {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: blackIcon
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "mithraeum");
        }
    }).addTo(m);

   sanctuaries = new L.geoJson(null,
    {
        onEachFeature: function (feature, layer)
        {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: greenIcon
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "sanctuary");
        }
    }).addTo(s);

   temples = new L.geoJson(null,
    {
        onEachFeature: function (feature, layer)
        {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: greyIcon
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.type == "temple");
        }
    }).addTo(t);

   tombs = new L.geoJson(null,
    {
        onEachFeature: function (feature, layer)
        {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: blueIcon
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
}

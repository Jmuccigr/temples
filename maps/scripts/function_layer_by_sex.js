function layer_by_sex()
{
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
        b = new L.LayerGroup();

    L.geoJson(temples,
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
            return (feature.properties.sex == "M");
        }
    }).addTo(m);

    L.geoJson(temples,
    {
        onEachFeature: function (feature, layer)
        {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng)
        {
            return L.marker(latlng,
            {
                icon: redIcon
            });
        },
        filter: function (feature, layer)
        {
            return (feature.properties.sex == "F");
        }
    }).addTo(f);

    L.geoJson(temples,
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
            return (feature.properties.sex == "M/F");
        }
    }).addTo(b);

    var overlays = {
        "<span style='color: black'>Male</span>": m,
        "<span style='color: red'>Female</span>": f,
        "<span style='color: grey'>Both</span>": b
    };

    // Make sure this is global so the control can be deleted by other scripts.
    ctl = L.control.layers(baseLayers, overlays,
    {
        collapsed: true,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);

    // Now add the overlays
    map.addLayer(m);
    map.addLayer(f);
    map.addLayer(b);
}

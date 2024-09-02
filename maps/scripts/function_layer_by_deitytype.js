function layer_by_deitytype() {
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
    var city = new L.LayerGroup(),
        concept = new L.LayerGroup(),
        emperor = new L.LayerGroup(),
        family = new L.LayerGroup(),
        god = new L.LayerGroup(),
        hero = new L.LayerGroup(),
        nature = new L.LayerGroup();
        unknown = new L.LayerGroup();

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: greyIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("city"));
        }
    }).addTo(city);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: blackIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("concept"));
        }
    }).addTo(concept);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: orangeIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("emperor"));
        }
    }).addTo(emperor);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: yellowIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("family"));
        }
    }).addTo(family);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: redIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("god"));
        }
    }).addTo(god);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: blueIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("hero"));
        }
    }).addTo(hero);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: greenIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("nature"));
        }
    }).addTo(nature);

    L.geoJson(temples, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: whiteIcon
            });
        },
        filter: function (feature, layer) {
            return (feature.properties.deitytype.includes("unknown"));
        }
    }).addTo(unknown);

    var overlays = {
        "<span style='color: grey'>Rome</span>": city,
        "<span style='color: black'>concept</span>": concept,
        "<span style='color: orange'>emperor</span>": emperor,
        "<span style='color: #c8c831'>family</span>": family,
        "<span style='color: red'>god</span>": god,
        "<span style='color: blue'>hero</span>": hero,
        "<span style='color: green'>nature</span>": nature
        "<span style='color: green'>unknown</span>": unknown
    };

    // Make sure this is global so the control can be deleted.
    ctl = L.control.layers(baseLayers, overlays, {
        collapsed: true,
        position: 'bottomleft'
    }).addTo(map);

    // Make the layers visible
    // First restore the map currently in use
    map.addLayer(currentMap);

    // Now add the overlays
    map.addLayer(city);
    map.addLayer(concept);
    map.addLayer(emperor);
    map.addLayer(family);
    map.addLayer(god);
    map.addLayer(hero);
    map.addLayer(nature);
}

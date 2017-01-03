// Define layers for the various kinds of monuments in temples.js
var	m = new L.LayerGroup(),
	s = new L.LayerGroup(),
	t = new L.LayerGroup(),
	tb = new L.LayerGroup();

L.geoJson(temples, {
	onEachFeature: function (feature, layer) {
        	layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: greyIcon});
    	},
        filter: function(feature, layer) {
        return (feature.properties.type == "mithraeum");
        }
    }).addTo(m);

L.geoJson(temples, {
	onEachFeature: function (feature, layer) {
        	layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: greenIcon});
    	},
        filter: function(feature, layer) {
        return (feature.properties.type == "sanctuary");
        }
    }).addTo(s);

L.geoJson(temples, {
	onEachFeature: function (feature, layer) {
        	layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: blackIcon});
    	},
        filter: function(feature, layer) {
        return (feature.properties.type == "temple");
        }
    }).addTo(t);

L.geoJson(temples, {
	onEachFeature: function (feature, layer) {
        	layer.bindPopup(feature.properties.name)
        },
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: blueIcon});
    	},
        filter: function(feature, layer) {
        return (feature.properties.type == "tomb");
        }
    }).addTo(tb);

// mapbox token - need to hide this
	var token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

	var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token;

	var dareAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base: <a href="http://dare.ht.lu.se/" title="Digital Atlas of the Roman Empire, Department of Archaeology and Ancient History, Lund University, Sweden">DARE</a>, 2015 (cc-by-sa).',
		dareUrl = 'http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';
		
	var awmcAttr = 	'Powered by <a href="http://leafletjs.com/">Leaflet</a> and <a href="https://www.mapbox.com/">Mapbox</a>. Map base by <a title="Ancient World Mapping Center (UNC-CH)" href="http://awmc.unc.edu">AWMC</a>, 2014 (cc-by-nc).',
		awmcUrl = 'https://api.tiles.mapbox.com/v4/isawnyu.map-knmctlkh/{z}/{x}/{y}.png?access_token=' + token;
	
	var osmAttr = 'OpenStreetMap',
		osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
// 		streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
		osm = L.tileLayer(osmUrl, {attribution: osmAttr}),
		satellite  = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr}),
		watercolor = new L.StamenTileLayer("watercolor"),
		toner = new L.StamenTileLayer("toner"),
		terrain = new L.StamenTileLayer("terrain"),
		imperium = L.tileLayer(dareUrl, {maxZoom: 11, attribution: dareAttr}),
		awmc = L.tileLayer(awmcUrl, {maxZoom: 12, attribution: awmcAttr});
		
// Center of the map, now set to show all markers, formerly Rome [41.893, 12.48]
	var	mapCenter = [37.57659, 23.81455];

	var map = L.map('map', {
		center: mapCenter,
		zoom: 5.5,
		minZoom: 3,
		layers: [osm, m, s, t, tb],
		zoomSnap: .5,
		zoomDelta: .5
	});

	var baseLayers = {
		"Modern streets": osm,
		"Grayscale": grayscale,
		"Satellite": satellite,
		"Terrain": terrain,
		"Toner": toner,
		"Watercolor": watercolor,
		"Imperium": imperium,
		"Ancient terrain": awmc
	};

	var overlays = {
		"<span style='color: grey'>mithraea</span>": m,
		"<span style='color: green'>sanctuaries</span>": s,
		"<span style='color: black'>temples</span>": t,
		"<span style='color: blue'>tombs</span>": tb
	};

	L.control.layers(baseLayers, overlays, {collapsed: false, position: 'bottomleft'}).addTo(map);
	
	L.control.scale({position: 'bottomright'}).addTo(map);


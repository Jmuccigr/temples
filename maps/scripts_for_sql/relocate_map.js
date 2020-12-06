// Center map on Rome at decent zoom
function rome() {
   mapZoom = Math.min(map.getMaxZoom(), 14);
   map.flyTo([41.893, 12.48], mapZoom)
};

// Zoom out at start
function all() {
	map.fitBounds(bounds);
};

// Zoom out
function showAll() {
	map.flyToBounds(bounds, {
		animate: true,
		duration: 3
	});
};

// Zoom to visible markers
function showVisible() {
	var vis = L.featureGroup(getVisibleFeatures());
	if ( vis.getLayers().length !== 0) {
		map.flyToBounds(vis.getBounds(), {
			animate: true,
			duration: 3,
			paddingTopLeft: [0, 20],
			paddingBottomRight: [0, 0]
		});
	}
};

function getVisibleFeatures() {
	var features = [];
	map.eachLayer(function(layer) {
		if (layer instanceof L.Marker) {
			features.push(L.marker([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]]));
		}
	});
	if (features.length == 0 ) {
	    alert('Oops, there are no visible sites.')
	}
	return features;
}

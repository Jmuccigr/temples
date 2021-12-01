// Show a tooltip on hover and load data on click
function onEachFeature(feature, layer) {
    // Move the tooltip offset depending on which of the icons is being used
    if (feature.properties.geocertainty == "1") {
        markerOffset = 0;
    } else {
        markerOffset = oset;
    }
    layer.bindTooltip(getTooltipText(feature, layer), {
            offset: [0, markerOffset]
        }).openTooltip(),
	layer.on({
		'click': function (e) {
			get_item_data(feature.properties.id);
		}
	});
}

// Generate text of tooltip
function getTooltipText(feature, layer) {
    tttext = '';
    if (feature.properties.ancientplace != '') {
        tttext = ' (at ' + feature.properties.ancientplace + ')';
    } else {
        if (feature.properties.modernplace != '') {
            tttext = ' (at ' + feature.properties.modernplace + ')';
        }
    }
    return feature.properties.name + tttext
}

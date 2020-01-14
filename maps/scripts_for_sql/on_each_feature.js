// Show a tooltip on hover and load data on click
function onEachFeature(feature, layer) {
    if (typeof oset == "undefined") {
        oset = 0;
    }
    layer.bindTooltip(getTooltipText(feature, layer), {
            offset: [0, oset]
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

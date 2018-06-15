function onEachFeature(feature, layer) {
    if (typeof oset == "undefined") {
        oset = 0;
    }
    layer.bindTooltip(feature.properties.name, {
            offset: [0, oset]
        }).openTooltip(),
	layer.on({
		'click': function (e) {
			get_item_data(feature.properties.id);
		}
	});
}

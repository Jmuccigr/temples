function onEachFeature(feature, layer) {
    if (typeof oset == "undefined") {
        oset = 0;
    }
    layer.bindTooltip(feature.properties.name, {offset: [0, oset]}).openTooltip(),
        layer.on({
            'click': function (e) {
                document.getElementById("side").innerHTML = '<h4>Temple of ' + feature.properties.name + '</h4><span style="font-size:small">' +
                    'Cited in:<br>' + getCitations(biblio.items, Number(feature.properties.id)) + '</span>' +
                    '<span style="font-size:x-small; align=center;" onclick="loadNavigation()"><br>(Restore navigation insructions.)</span>';
            }
        });
}

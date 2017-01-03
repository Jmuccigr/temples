function clearLayers() {
    for (i in map._layers) {
        if (map._layers[i].options.format == undefined) {
            try {
                map.removeLayer(map._layers[i]);
            } catch (e) {
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
}

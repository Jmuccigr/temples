var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token;

var dareAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base: <a href="http://dare.ht.lu.se/" title="Digital Atlas of the Roman Empire, Department of Archaeology and Ancient History, Lund University, Sweden">DARE</a>, 2015 (cc-by-sa).',
    dareUrl = 'http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png';

var awmcAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a> and <a href="https://www.mapbox.com/">Mapbox</a>. Map base by <a title="Ancient World Mapping Center (UNC-CH)" href="http://awmc.unc.edu">AWMC</a>, 2014 (cc-by-nc).',
    awmcUrl = 'https://api.tiles.mapbox.com/v4/isawnyu.map-knmctlkh/{z}/{x}/{y}.png?access_token=' + token;

var osmAttr = 'OpenStreetMap',
    osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var grayscale = L.tileLayer(mbUrl, {
        id: 'mapbox.light',
        attribution: mbAttr
    }),
    // 	streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
    osm = L.tileLayer(osmUrl, {
        attribution: osmAttr
    }),
    satellite = L.tileLayer(mbUrl, {
        id: 'mapbox.satellite',
        attribution: mbAttr
    }),
    watercolor = new L.StamenTileLayer("watercolor"),
    toner = new L.StamenTileLayer("toner"),
    terrain = new L.StamenTileLayer("terrain"),
    imperium = L.tileLayer(dareUrl, {
        maxZoom: 11,
        attribution: dareAttr
    }),
    awmc = L.tileLayer(awmcUrl, {
        maxZoom: 12,
        attribution: awmcAttr
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

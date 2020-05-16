var token = 'pk.eyJ1IjoibXVjY2lncm9zc28iLCJhIjoiY2lxanZ2d2luMDBlaGdoajl2YWJtZ3I2ZSJ9.MASxkbE98-h55S5W7oM0xQ';

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token;

var dareAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base: <a href="https://dh.gu.se/dare/" title="Digital Atlas of the Roman Empire, Centre for Digital Humanities, University of Gothenburg, Sweden">DARE</a> (CC BY 4.0).',
    dareUrl = 'https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png';

var awmcAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a> and <a href="https://www.mapbox.com/">Mapbox</a>. Map base by <a title="Ancient World Mapping Center (UNC-CH)" href="http://awmc.unc.edu">AWMC</a>, 2014 (cc-by-4.0).',
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

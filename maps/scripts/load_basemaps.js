var rapidUrl = 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=',
    rapidAttr = 'Map data &copy; <a href="https://www.maptilesapi.com/">Map Tiles API</a> | Map data &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'

var mbAttr = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxToken;

var dareAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base: <a href="https://dh.gu.se/dare/" title="Digital Atlas of the Roman Empire, Centre for Digital Humanities, University of Gothenburg, Sweden">DARE</a> (CC BY 4.0).',
    dareUrl = 'https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png';

var cawmAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a> and <a href="https://www.mapbox.com/">Mapbox</a>. Map base by <a title="Consortium of Ancient World Mappers" href="http://cawm.lib.uiowa.edu/">Consortium of Ancient World Mappers</a>, 2022 (cc-by-4.0).',
    oldawmcUrl = 'https://api.tiles.mapbox.com/v4/isawnyu.map-knmctlkh/{z}/{x}/{y}.png?access_token=' + mapboxToken,
    cawmUrl = 'http://cawm.lib.uiowa.edu/tiles/{z}/{x}/{y}.png';

var osmAttr = 'OpenStreetMap',
    osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var stadiaAttr = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'

var     osm = L.tileLayer(rapidUrl + rapidToken, {
        maxZoom: 19,
        attribution: rapidAttr
    }),
//     osm = L.tileLayer(osmUrl, {
//         maxZoom: 19,
//         attribution: osmAttr
//     }),
    grayscale = L.tileLayer(mbUrl, {
        maxZoom: 20,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr
    }),
    satellite = L.tileLayer(mbUrl, {
        id: 'mapbox/satellite-v9',
        maxZoom: 20,
        tileSize: 512,
        zoomOffset: -1,
        attribution: mbAttr
    }),
    watercolor = new L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
      maxZoom: 18,
      attribution: stadiaAttr
    }),
    toner = new L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: stadiaAttr
    }),
    terrain = new L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: stadiaAttr
    }),
    imperium = L.tileLayer(dareUrl, {
        maxZoom: 18,
        attribution: dareAttr
    }),
    cawm = L.tileLayer(cawmUrl, {
        maxZoom: 11,
        accessToken: mapboxToken,
        attribution: cawmAttr
    });

var baseLayers = {
    "Modern streets": osm,
    "Grayscale": grayscale,
    "Satellite": satellite,
    "Terrain": terrain,
    "Toner": toner,
    "Watercolor": watercolor,
    "Imperium": imperium,
    "Ancient terrain": cawm
};


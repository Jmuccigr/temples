var rapidUrl = 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=',
    rapidAttr = 'Map data &copy; <a href="https://www.maptilesapi.com/">Map Tiles API</a> | Map data &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'

var mtAttr = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    mtUrl = 'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=' + maptilerToken;

var dareAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base: <a href="https://dh.gu.se/dare/" title="Digital Atlas of the Roman Empire, Centre for Digital Humanities, University of Gothenburg, Sweden">DARE</a> (CC BY 4.0).',
    dareUrl = 'https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png';

var cawmAttr = 'Powered by <a href="http://leafletjs.com/">Leaflet</a>. Map base by <a title="Consortium of Ancient World Mappers" href="http://cawm.lib.uiowa.edu/">Consortium of Ancient World Mappers</a>, 2022 (cc-by-4.0).',
    cawmUrl = 'https://cawm.lib.uiowa.edu/tiles/{z}/{x}/{y}.png';

var osmAttr = 'OpenStreetMap',
    osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var stadiaAttr = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'

var osm = L.tileLayer(rapidUrl + rapidToken, {
        maxZoom: 19,
        attribution: rapidAttr
    }),
    satellite = L.tileLayer(mtUrl, {
        maxZoom: 22,
        tileSize: 512,
        zoomOffset: -1,
        attribution: mtAttr
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
        attribution: cawmAttr
    });

var baseLayers = {
    "Modern streets": osm,
    "Satellite": satellite,
    "Terrain": terrain,
    "Toner": toner,
    "Watercolor": watercolor,
    "Imperium": imperium,
    "Ancient terrain": cawm
};


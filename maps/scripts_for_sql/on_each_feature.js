function onEachFeature(feature, layer) {
    if (typeof oset == "undefined") {
        oset = 0;
    }
    layer.bindTooltip(feature.properties.name, {offset: [0, oset]}).openTooltip(),
        layer.on({
            'click': function (e) {
                otherDB = '<li>';
                loc = '';
                cites = '';
    			l = false;
                text = '<h4>Temple of ' + feature.properties.name + '</h4><span style="font-size:small"><ul>';
                if (feature.properties.id != '') {
                    text = text + '<li>ID: ' + feature.properties.id + '</li>';
                    }
                if (feature.properties.dedicatee != '') {
                    text = text + '<li>Dedicated to ' + feature.properties.dedicatee.replace (/,/g, ' and ') + '</li>';
                    }
                if (feature.properties.location != '' || feature.properties.city != '' || feature.properties.country != '') {
                    loc = '<li>Location: ';
                    if (feature.properties.location != '') {
						loc = loc + feature.properties.location;
						l = true;
						}
                    if (feature.properties.city != '') {
						if (l) { loc = loc +  ' in ';}
						loc = loc + feature.properties.city;
						}
                    if (feature.properties.country != '') {
						if (loc.length > 14 ) {loc = loc +  ', ' }
						loc = loc + feature.properties.country;
						}
                    text = text + loc + '</li>';
                    }
                // Get the other database info and put it on one line
                if (feature.properties.pleiades != '') {
                    otherDB = otherDB + '<a target="_blank" href="https://pleiades.stoa.org/places/' + feature.properties.pleiades + '">Pleiades</a>';
                    }
                if (feature.properties.dare != '') {
                    if (otherDB.length > 4) { otherDB = otherDB + ', ' };
                    otherDB = otherDB + '<a target="_blank" href="http://dare.ht.lu.se/places/' + feature.properties.dare + '">DARE</a>';
                    }
                if (feature.properties["vici.org"] != '') {
                    if (otherDB.length > 4) { otherDB = otherDB + ', ' };
                    otherDB = otherDB + '<a target="_blank" href="https://vici.org/vici/' + feature.properties["vici.org"] + '">Vici.org</a>';
                    }
                if (feature.properties.arachne != '') {
                    if (otherDB.length > 4) { otherDB = otherDB + ', ' };
                    otherDB = otherDB + '<a target="_blank" href="https://arachne.dainst.org/entity/' + feature.properties.arachne + '">Arachne</a>';
                    }
                if (feature.properties.wikidata != '') {
                    if (otherDB.length > 4) { otherDB = otherDB + ', ' };
                    otherDB = otherDB + '<a target="_blank" href="https://www.wikidata.org/wiki/' + feature.properties.wikidata + '">WikiData</a>';
                    }
                if (feature.properties.wikipedia != '') {
                    if (otherDB.length > 4) { otherDB = otherDB + ', ' };
                    otherDB = otherDB + '<a target="_blank" href="https://en.wikipedia.org/wiki/' + feature.properties.wikipedia + '">Wikipedia</a>';
                    }
                if (otherDB.length == 4) { otherDB = '' } else { otherDB = otherDB + '</li>' }
                if (feature.properties.cite != '') {
                    cites = '<li>Cited in<ol><li>' + feature.properties.cite + '</li></ol>';
                    }
                document.getElementById("side").innerHTML = text + otherDB + cites +
				'<br><span style="font-size:x-small; align=center;" onclick="loadNavigation()"><br>(Restore navigation instructions.)</span>';
            }
        });
}

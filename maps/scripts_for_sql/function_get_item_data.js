function get_item_data(itemID) {

// Iterate over the allPoints array to find the clicked-on item
// If the array has a length of one, just skip the search and use that item
res = [];
if ( allPoints.length > 1 ) {
	for(var i = 0; i < allPoints.length; i++)
	{
		if (allPoints[i].properties.id == itemID) {
			res.push(allPoints[i]);
			break;
		}
	}
} else {
	res.push(allPoints[0]);
}
// Change it to an array
res = res[0];
		otherDB = '<li>';
		loc = '';
		cites = '';
		l = false;
// 		if (document.title == '') {
// 			document.title = res.properties.name + ' (' + res.properties.modernplace + ' ' + res.properties.country + ')';
// 			var file = document.createElement('link');
// 			file.setAttribute("rel", "canonical");
// 			file.setAttribute("href", 'www.romeresearchgroup.org/items/' + res.properties.id);
// 			document.head.appendChild(file);
// 		}
		text = '<h2>' + res.properties.name + '</h2><span style="font-size:small"><ul>';
		if (res.properties.id != '') {
			text = text + '<li>ID: ' + res.properties.id + '</li>';
		}
		text = text + '<li title="Canonical URI for this temple.">' + 'URI: <a href="' + window.location.protocol + '//' + window.location.host + '/items/' + res.properties.id + '" target="_blank">' + window.location.protocol + '//RomeResearchGroup.org/items/' + res.properties.id + '</a></li>';
		text = text + '<li title="Other representations for this temple:">Other representations: ' + '<a href="/items/' + res.properties.id + '/json/" target="_blank">JSON</a> or <a href="/items/' + res.properties.id + '/csv/" target="_blank">CSV</a></li>';
		if (res.geometry.coordinates[0] != '') {
			if (res.properties.geocertainty == '1') {
				text = text + '<li>Estimated '
			} else {
				text = text + '<li>'
		}
		text = text + 'Lat, Long: ' + res.geometry.coordinates[1] + ', ' + res.geometry.coordinates[0] ;
		text = text + '<a href="#" onclick="map.flyTo([' + res.geometry.coordinates[1] + ',' + res.geometry.coordinates[0] + '], map.getMaxZoom()); return true;" style="text-decoration: none" title="Center and zoom to location on the map at its highest supported resolution">&nbsp;🔍</a></li>';
		} else {
		text = text + '<li><span <span style="color: red;"> Location unknown!</span></li>'
		}
		if (res.properties.culture != '') {
			text = text + '<li>' + res.properties.culture + '</li>';
		}
		if (res.properties.dedicatee != '') {
			text = text + '<li>Dedicated to ' + res.properties.dedicatee.replace(/,/g, ' and ')
			if (res.properties.dedicationday != '') {
				text = text + ' on ' + res.properties.dedicationday;
			}
			text = text + '</li>';
		}
		if (res.properties.date != '') {
			text = text + '<li>Construction dated to ' + fixDate(res.properties.date)
			text = text + '</li>';
		}
		if (res.properties.pleiadesplace != '') {
			getPleiadesPlace(res.properties.pleiadesplace);
			text = text + '<span id="pleiadesEntry"><li>Ancient location: <a target="_blank" href="https://pleiades.stoa.org/places/' + res.properties.pleiadesplace + '"><span id="pleiades" title="Load Pleiades place resource in a new page."><i>loading</i></span></a></li></span>';
		}
		if (res.properties.location != '' || res.properties.modernplace != '' || res.properties.country != '') {
			loc = '<li>Found in: ';
			if (res.properties.location != '') {
				loc = loc + res.properties.location;
				l = true;
			}
			if (res.properties.modernplace != '') {
				if (l) {
					loc = loc + ' in ';
				}
				loc = loc + res.properties.modernplace;
			}
			if (res.properties.country != '') {
				if (loc.length > 14) {
					loc = loc + ', '
				}
				loc = loc + 'modern ' + res.properties.country;
			}
			if (res.properties.compass != '' ) {
				if (loc.length > 14) {
					loc = loc + ', '
				}
				loc = loc + ' facing ' + res.properties.compass;
			}
			text = text + loc + '</li>';
		}
		// Get the other database info and put it on one line
		if (res.properties.arachne != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://arachne.dainst.org/entity/' + res.properties.arachne + '">Arachne</a>';
		}
		if (res.properties.dare != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://imperium.ahlfeldt.se/places/' + res.properties.dare + '">DARE</a>';
		}
		if (res.properties.digitalromanforum != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://wayback.archive-it.org/7877/20160919154207/http://dlib.etc.ucla.edu/projects/Forum/reconstructions/' + res.properties.digitalromanforum + '">Digital Roman Forum</a> via Archive.org';
		}
		if (res.properties.digitalesforumromanum != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://www.digitales-forum-romanum.de/gebaeude/' + res.properties.digitalesforumromanum + '/?lang=en/">Digitales Forum Romanum</a>';
		}
		if (res.properties.livius != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://www.livius.org/articles/' + res.properties.livius + '/">Livius</a>';
		}
		if (res.properties.pleiades != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://pleiades.stoa.org/places/' + res.properties.pleiades + '">Pleiades</a>';
		}
		if (res.properties.trismegistos != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://www.trismegistos.org/place/' + res.properties.trismegistos + '">Trismegistos</a>';
		}
		if (res.properties.vici != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://vici.org/vici/' + res.properties.vici + '">Vici.org</a>';
		}
		if (res.properties.wikidata != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://www.wikidata.org/wiki/' + res.properties.wikidata + '">WikiData</a>';
		}
		if (res.properties.wikipedia != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			wikitext = 'en.wikipedia.org/wiki/' + res.properties.wikipedia;
			newwikitext = wikitext.replace(/en(\.wikipedia\.org\/wiki\/)([a-z][a-z])=/, '$2$1');
			otherDB = otherDB + '<a target="_blank" href="https://' + newwikitext + '">Wikipedia</a>';
		}
		if (res.properties.ads != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=' + res.properties.ads + '">Archaeological Data Service</a>';
		}
		if (res.properties.cona != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://vocab.getty.edu/page/cona/' + res.properties.cona + '">Getty Cultural Objects Name Authority (CONA)</a>';
		}
		if (res.properties.topostext != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://topostext.org/place/' + res.properties.topostext + '">ToposText</a>';
		}
		if (res.properties.sls != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://slsgazetteer.org/' + res.properties.sls + '">Heritage Gazetteer of Libya</a>';
		}
		if (res.properties.patrimonium != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://patrimonium.huma-num.fr/places/' + res.properties.patrimonium + '">Atlas Patrimonii Caesaris</a>';
		}
		if (otherDB.length == 4) {
			otherDB = ''
		} else {
			otherDB = otherDB + '</li>'
		}
		if (res.properties.cite != '') {
			cites = '<li>Citations:<ol><li>' + res.properties.cite + '</li></ol>';
		}
		document.getElementById("side_bottom").innerHTML = text + otherDB + cites +
			'<br><a href="#" style="font-size:x-small; align=center;" onclick="loadNavigation()">(Restore navigation instructions.)</a>';
}

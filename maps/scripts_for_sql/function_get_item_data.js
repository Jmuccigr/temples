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
		text = '<h2>' + res.properties.name + '</h2><span style="font-size:small"><ul>';
		if (res.properties.id != '') {
			text = text + '<li>ID: ' + res.properties.id + '</li>';
		}
		if (res.geometry.coordinates[0] != '') {
		text = text + '<li>Lat, Long: ' + res.geometry.coordinates[1] + ', ' + res.geometry.coordinates[0] + '</li>';
		} else {
		text = text + '<li>Precise location unknown!</li>'
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
		if (res.properties.location != '' || res.properties.city != '' || res.properties.country != '') {
			loc = '<li>Location: ';
			if (res.properties.location != '') {
				loc = loc + res.properties.location;
				l = true;
			}
			if (res.properties.city != '') {
				if (l) {
					loc = loc + ' in ';
				}
				loc = loc + res.properties.city;
			}
			if (res.properties.country != '') {
				if (loc.length > 14) {
					loc = loc + ', '
				}
				loc = loc + res.properties.country;
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
			otherDB = otherDB + '<a target="_blank" href="http://dare.ht.lu.se/places/' + res.properties.dare + '">DARE</a>';
		}
		if (res.properties.digitalromanforum != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://www.wikidata.org/wiki/' + res.properties.digitalromanforum + '">Digital Roman Forum</a>';
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
		if (res.properties["vici.org"] != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="https://vici.org/vici/' + res.properties["vici.org"] + '">Vici.org</a>';
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
			otherDB = otherDB + '<a target="_blank" href="https://en.wikipedia.org/wiki/' + res.properties.wikipedia + '">Wikipedia</a>';
		}
		if (res.properties.ads != '') {
			if (otherDB.length > 4) {
				otherDB = otherDB + ', '
			};
			otherDB = otherDB + '<a target="_blank" href="http://archaeologydataservice.ac.uk/archives/view/romangl/maprecord.cfm?id=' + res.properties.ads + '">Archaeological Data Service</a>';
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
			'<br><span style="font-size:x-small; align=center;" onclick="loadNavigation()"><br>(Restore navigation instructions.)</span>';
}

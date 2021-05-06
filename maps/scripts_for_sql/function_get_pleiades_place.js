function getPleiadesPlace(id) {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://pleiades.stoa.org/places/' + id + '/json', true)

    request.onload = function() {
        // Handle errors from the Pleiades server
        rs = request.status;
        if (rs >= 200 && rs < 400) {
            // Create a default place name
            var place = '[unknown]';
            var latinName = '';
            var greekName = '';

            // Begin accessing JSON data here
            var data = JSON.parse(this.response);

            // Grab Latin and Greek names for the Roman period. Use Latin first, or else the first name in the group if neither is present
            if (data.names == '') {
                document.getElementById("pleiades").innerHTML = "[Name unknown]"
            } else {
                for (i = 0; i < data.names.length; i++) {
                    if (data.names[i].nameType == 'geographic') {
						for (j = 0; j < data.names[i].attestations.length; j++) {
							if (data.names[i].attestations[j].timePeriod == 'roman') {
								if (data.names[i].language == 'la') {
									latinName = data.names[i].romanized;
								} else {
									if (data.names[i].language == 'grc') {
										greekName = data.names[i].romanized;
									}
								}
							}
						}
					}
				}
                if (latinName + greekName == '') {
                    place = data.names[0].romanized
                    if (data.names[0].language != '') {
                        place += ' (' + data.names[0].language.toUpperCase() + ')'
                    }
                } else {
                    if (latinName != '') {
                        place = latinName
                    } else {
                        place = greekName
                    }
                }
                document.getElementById("pleiades").innerHTML = place;
            }
        } else {
            if (rs == '404') {
                errorText = '<i>[ID not found!]</i>'
            } else {
                errorText = '<i>[Pleiades server error]</i>'
            }
            document.getElementById("test").innerHTML = errorText;
        }
    }

    // Send request
    request.send();

}

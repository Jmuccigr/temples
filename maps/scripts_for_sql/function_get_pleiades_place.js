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

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

	// Grab English name or else the first one
    for (i = 0; i < data.names.length; i++) {
        if (data.names[i].language == 'en') {
            place = data.names[i].romanized;
        }
    }
	if (place == '[unknown]') {
		place = data.names[0].romanized
		if (data.names[0].language != '') {
		place += ' (' + data.names[0].language.toUpperCase() + ')'
		}
	}
	document.getElementById("pleiades").innerHTML = place;
	} else {
	if ( rs == '404') {
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

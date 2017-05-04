// Create a cookie with the sql code from the form & update the map

function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    document.getElementById("p1").innerHTML = 'Current query:' + value;
    // Send change event to menu that selects overlay layers so it updates the map
    var event = new Event('change');
    var value = document.getElementById("mymenu").options[selectmenu.selectedIndex].value;
	if (value == 'nothing' & runCounter > 0) {
		alert ("Don't forget to select a map variable!")
	}
	else {
	runCounter++;
	selectmenu.dispatchEvent(event);
	}
}

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
    if (days != '-1') {
//         alert('Current query:' + value);
        var map = document.getElementById("mymenu").options[selectmenu.selectedIndex].value;
        if (map == 'nothing') {
            alert("Don't forget to select a map variable!")
        } else {
            // Send change event to menu that selects overlay layers so it updates the map
            selectmenu.dispatchEvent(new Event('change'));
        }
    }
}

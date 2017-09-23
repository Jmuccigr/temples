// Search loaded biblio for id and return the citations

function getCitations(array, id) {
    citations = '';
    j = 0;
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].templeID === id) {
             if (array[i].loci != '') {lociConn = ' in '} else {lociConn = ''};
             j++;
             citations = citations + j + '. ' + titleCase(array[i].loci) + lociConn + array[i].citation_html + '<br>';
        }
    }
    return citations;
}

function titleCase(string) {
    string.charAt(0).toUpperCase() + string.slice(1);
}

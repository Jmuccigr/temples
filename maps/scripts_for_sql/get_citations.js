// Search loaded biblio for id and return the citations

function getCitations(array, id) {
    citations = '';
    j = 0;
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].templeID === id) {
             if (array[i].loci != '') {lociConn = ' of '} else {lociConn = ''};
             j++;
             citations = citations + j + '. ' + array[i].loci + lociConn + array[i].citation_html + '<br>';
        }
    }
    if (citations == '') { 
        citations = '<em>No citations in the database.</em>'; 
    }  // Nothing found
    return citations;
}

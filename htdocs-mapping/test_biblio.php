<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

<?php include 'scripts/get_biblio.php' ?>

<script>
function getCitations(array, id) {
    citations = '';
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].templeID === id) {
            citations = citations + array[i].citation_html + "\n";
        }
    }
    if (citations == '') { 
        citations = '<em>No citations in the database.</em>'; 
    }
    return citations;
}
</script>

<script>
document.write(getCitations(biblio.items, 1000001));
</script>


</body>
</html>

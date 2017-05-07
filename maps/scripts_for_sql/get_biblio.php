<?php
/**
 * Title:   SQLite to GeoJSON (Requires https://github.com/phayes/geoPHP)
 * Notes:   Query a SQLite table or view (with a WKB GEOMETRY field) and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc. Use QGIS to OGR to convert your GIS data to SQLite.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */
 
 // Returns an array as variable 'biblio', consisting of all the bibliography.
 
$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("../forbidden/pw.txt"));

# Connect to SQLite database
$conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

# Build SQL SELECT statement and return the geometry as a GeoJSON element
$sql = 'SELECT templeID, loci, citation_html FROM citations JOIN biblio ON citations.refKey = biblio.refKey ';

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo "An SQL error occured.\n";
    exit;
} else {
}

# Build GeoJSON feature collection array
$biblio = array(
   'items'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $item = array(
		'templeID' =>  $row['templeID'],
		'loci' =>  $row['loci'],
        'citation_html' => $row['citation_html']
    );
    # Add item arrays to items array
    array_push($biblio['items'], $item);
}

$conn = NULL;

//header('Content-type: application/json; charset=utf-8');
$text = json_encode($biblio, JSON_NUMERIC_CHECK);
echo '<script>var biblio = ' . $text . ';</script>'
?>

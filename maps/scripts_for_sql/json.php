<?php
/**
 * Title:   SQLite to GeoJSON (Requires https://github.com/phayes/geoPHP)
 * Notes:   Query a SQLite table or view (with a WKB GEOMETRY field) and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc. Use QGIS to OGR to convert your GIS data to SQLite.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */
$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("../../forbidden/pw.txt"));

# Connect to SQLite database
$conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET group_concat_max_len = 10000'));
// Keep the next line as an alternative in case the UTF-8 setting isn't working
// $conn->exec("SET group_concat_max_len = 2048");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
$queryStart = 'select temples.*, IFNULL(cite,"") AS cite FROM temples LEFT JOIN (SELECT templeID, GROUP_CONCAT(CONCAT(biblio.citation_html, IF(loci = "", "", ", "), loci, "." ) ORDER BY citation_html SEPARATOR "</li>\n<li>") AS cite FROM citations LEFT JOIN biblio ON citations.refKey = biblio.refKey GROUP BY templeID) AS cites ON id = templeID WHERE ';

# Check for cookies
# First determine whether request is for one item (info) or for a set (mapping)
# Then insert sql query into it
if ($_COOKIE["querytype"] == 'item') {
    $queryEnd = '';
} else {
    $queryEnd = ' AND longitude != "" AND type = "temple" ORDER BY name';
}
if ($_COOKIE["sqlquery"] != '') {
    $sql = $queryStart . $_COOKIE["sqlquery"] . $queryEnd;
} else {
     $sql = $queryStart . 'id != ""' . $queryEnd;
}
# Try query or error
// Keep the next line as an alternative in case the PDO isn't the best place to set this variable
// $rs = $conn->query('set group_concat_max_len = 2048');
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
} else {
}

# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
# Remove lat and long fields from properties (optional)
    unset($properties['latitude']);
    unset($properties['longitude']);
    $feature = array(
        'type' => 'Feature',
        'geometry' => array(
            'type' => 'Point',
            'coordinates' => array(
                $row['longitude'],
                $row['latitude']
            )
        ),
        'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
}

//header('Content-type: application/json; charset=utf-8');
echo json_encode($geojson, JSON_NUMERIC_CHECK);
$conn = NULL;
?>

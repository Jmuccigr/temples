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
$conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

# Build SQL SELECT statement and return the geometry as a GeoJSON element
// $queryStart = 'select temples.*, citations.loci, biblio.citation_html from temples left join citations on id = templeID left join biblio on citations.refKey = biblio.refKey WHERE ';
// $queryEnd = ' longitude != "" AND type = "temple" ORDER BY name';
$queryStart = 'select temples.*, IFNULL(cite,"") as cite from temples left join (select templeID, GROUP_CONCAT(concat(loci, IF(biblio.citation_html IS NULL, "", " in "), biblio.citation_html) SEPARATOR "</li>\n<li>") AS cite from citations left join biblio on citations.refKey = biblio.refKey group by templeID) cites on id = templeID WHERE ';
// $queryStart = 'select * from temples WHERE ';
$queryEnd = ' longitude != "" AND type = "temple" ORDER BY name';
# Check for cookie
if ($_COOKIE["sqlquery"] != '') {
    $sql = $queryStart . $_COOKIE["sqlquery"] . ' AND ' . $queryEnd;
    }
else {
     $sql = $queryStart . $queryEnd;
    }
# Try query or error
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

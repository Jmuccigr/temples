<?php

// Clean the URI
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("forbidden/pw.txt"));

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = 'SELECT * from temples';

	$queryString = $_GET;
	
// If the URI contains some _GET string, assume it's valid and see what happens.
if ($queryString != []) {
//  Turn it into a sql request
	$count = count($queryString);
	$counter = 0;
	$sql = $sql . " WHERE ";
	foreach($queryString as $x => $x_value) {
		$sql = $sql . test_input($x) . ' LIKE "%' . test_input($x_value) . '%"';
		$counter++;
		if ($counter < $count) {
		    $sql = $sql . " AND ";
		}
	}
}

// Ouput records as csv
    $stmt = $conn->prepare($sql); 
    $stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC); 

// Make sure there were some results before doing a lot of work
if ( count($result) > 0 ) {
// First output column names as header row
	$rs = $conn->query($sql . ' LIMIT 0');
	for ($i = 0; $i < $rs->columnCount(); $i++) {
		$col = $rs->getColumnMeta($i);
		$columns[] = $col['name'];
	}
	$headers=implode(",",$columns);

// Then output results
    $out = fopen('php://output', 'w');
	echo $headers . "\n";
	foreach ($result as $field) {
		fputcsv($out, $field);
		}
	fclose($out);
}
else {
    echo "No records found matching query.";
}
	$conn = null;
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>

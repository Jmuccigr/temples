<?php

$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("forbidden/pw.txt"));

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = 'SELECT * from temples';

// Output column names as header row first
	$rs = $conn->query($sql . ' LIMIT 0');
	for ($i = 0; $i < $rs->columnCount(); $i++) {
		$col = $rs->getColumnMeta($i);
		$columns[] = $col['name'];
	}
	$string=implode(",",$columns);
	echo $string . "\n";

// Ouput records as csv
    $stmt = $conn->prepare($sql); 
    $stmt->execute();

	$result = $stmt->fetchAll(PDO::FETCH_ASSOC); 
	$out = fopen('php://output', 'w');
	foreach ($result as $field) {
		fputcsv($out, $field);
		}
	fclose($out);

	$conn = null;
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>

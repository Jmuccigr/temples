<?php
// Insert item info into page title.

$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("../forbidden/pw.txt"));
$sql = 'select ID, name, location, modernplace, country FROM temples WHERE ID = ' . basename($_SERVER['REQUEST_URI']);

# Connect to SQLite database
// $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->query($sql);
	// Should be only one, but loop anyway
	while ($row = $stmt->fetch())
		{
		$text = $row['name'] . ' (' . trim($row['location'] . ' - ' . $row['modernplace'] . ', ' . $row['country']) . '): ' . $row['ID'];
		$text = str_replace('(- ', '(', $text);
		$text = str_replace(' - ,', ',', $text);
		$text = str_replace(' (,)', '', $text);
		}
	}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo $text;
?>

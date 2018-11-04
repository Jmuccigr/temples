<?php
// Insert item info into page title.

$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("../forbidden/pw.txt"));
// sqlquery cookie will have "ID=#######" if this is called from items view
$sql = 'select name, city, country FROM temples WHERE ' . $_COOKIE["sqlquery"];

# Connect to SQLite database
$conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->query($sql);
// Should be only one, but loop anyway
while ($row = $stmt->fetch())
	{
	$text = '        <title>' . $row['name'] . ' (' . trim($row['city'] . ' ' . $row['country']) . ')</title>' . "\n";
	}
    }
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo $text;
?>

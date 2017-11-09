<?php
include 'get_columns.php';

function makeMenu($id, $tag) {
echo '<form id="' . $id . 'form" style="display:inline; margin:0 .5em 0 0;">' . "\n" . '<select id="' . $id . '">' . "\n";
echo '<option value="">Field ' . $tag . '</option>' . "\n"; 


$servername = "localhost";
$username = "romerese_temples";
$dbname = "romerese_temples";
$password = trim(file_get_contents("../forbidden/pw.txt"));

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
$sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='" . $dbname . "' AND TABLE_NAME ='temples' AND COLUMN_NAME NOT LIKE '%itude' AND COLUMN_NAME != 'type'";

    $stmt = $conn->prepare($sql); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    foreach(new menuItems(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo '</select>' . "\n" . '</form>' . "\n";
}

function makeOperatorMenu($id) {
	echo '<form id="' . $id . 'form" style="display:inline; margin:0 .1em 0 0;">' . "\n" . '<select id="' . $id . '">' . "\n";
	echo '<option value="contains">contains</option>' . "\n"; 
	echo '<option value="doesNotContain">doesn\'t contain</option>' . "\n"; 
	echo '<option value="beginsWith">begins with</option>' . "\n"; 
	echo '<option value="is">is</option>' . "\n"; 
	echo '<option value="isNot">is not</option>' . "\n"; 
	echo '<option value="lessThan">less than (for numbers)</option>' . "\n"; 
	echo '<option value="greaterThan">greater than (for numbers)</option>' . "\n"; 
	echo '</select>' . "\n" . '</form>' . "\n";
}

?>

<?php
header_remove();
$file = "../temples_c.json";
$requestedID = $_SERVER['QUERY_STRING'];

// get the file contents, assuming the file to be readable (and exist)
$contents = file_get_contents($file);

// escape special characters in the query
$pattern = preg_quote($requestedID, '/');
// finalise the regular expression, matching the whole line
$pattern = "/^.*id\":\"$pattern\".*\$/m";
// search, and store the matching occurence in $match & return it
if (preg_match_all($pattern, $contents, $match)) {
	header('Content-Type: application/json');
    echo implode("\n", $match[0]);
}
else {
	header('Content-Type: text/plain');
	echo "Item \"" . $requestedID . "\" not found";
}
?>

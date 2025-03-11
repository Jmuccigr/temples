<?php
// Read map tokens from files.
$mapboxToken = trim(file_get_contents("../forbidden/mapbox_token.txt"));
$maptilerToken = trim(file_get_contents("../forbidden/maptiler_token.txt"));
$rapidToken = trim(file_get_contents("../forbidden/rapid_token.txt"));
echo '<script>
    var mapboxToken = "' . $mapboxToken . '";
    var maptilerToken = "' . $maptilerToken . '";
    var rapidToken = "' . $rapidToken . '";
</script>';
?>

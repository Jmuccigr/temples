<!DOCTYPE html>
<html>
	<head>
		<title><?php include 'scripts/title.php' ?></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="scripts/leaflet/leaflet.css" />
		<link rel="stylesheet" href="/css/map.css" />
		<?php echo '<link rel="canonical" href="https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'" />'.PHP_EOL;
		?>
	</head>
	<body>
<script type="application/ld+json">
{
  "@context":"http://schema.org/",
  "@type":"Dataset",
  "name":"Temples of the Classical World",
  "description":"A database of structures, extant and attested, identified as temples in the Classical World, broadly defined.",
  "url":"https://romeresearchgroup.org/database-of-temples/",
  "license": "http://creativecommons.org/licenses/by-nc/4.0/",
  "keywords":[
     "TEMPLES"
  ],
  "creator":{
     "@type":"Person",
     "url": "https://jmuccigr.github.io",
     "name":"John D. Muccigrosso",
     "contactPoint":{
     	"@type":"contactPoint",
     	"contactType":"technical support",
        "email":"jmuccigr@drew.edu",
        "url":"http://jmuccigr.github.io/"
     }
  },
  "distribution":
     {
        "@type":"DataDownload",
        "encodingFormat":"CSV",
        "contentUrl":"https://RomeResearchGroup.org/search"
     },
  "temporalCoverage":"-750/640",
  "spatialCoverage":{
     "@type":"Place",
     "geo":{
        "@type":"GeoShape",
        "box":"56.821589 -22.720528 12.581669 54.346392"
     }
  }
}
</script>

<div id='mask'>
        <table>
			<tr>
				<td colspan=2>
					<h1>
						Temples of the Classical World
					</h1>
				</td>
			</tr>
			<tr>
				<td id='side_top'>
					<form id="mapType" style="vertical-align=left; visibility: hidden; height: 0px">
						<select id="mymenu" size="1">
							// Select a mapping style that will work for any object
							<option value="deitytype" selected="selected">
								Selected item
							</option>
						</select>
					</form>
<!--
					<br>
 -->
					<p align="center" style="font-size:small">
						Zoom to: <a id="rome" href="javascript:rome();">
							Rome
						</a>
						or
						<a id="all" href="javascript:showAll();">
							the world
						</a>
						or
						<a id="all" href="javascript:showVisible();">
							visible sites
						</a>
					</p>
					<hr width="80%">
				</td>
				<td rowspan="2" id='map'>
				</td>
			</tr>
			<tr>
				<td>
				    <div id="side_bottom"></div>
				</td>
			</tr>
			<tr id='bottom' style="height:0vh">
				<td colspan=2>
				</td>
			</tr>
		</table>
</div>
		<script type="text/javascript">var allPoints = {};
		</script>
		<script type="text/javascript">document.cookie = "querytype=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
		</script>
		<script type="text/javascript">document.cookie = "querytype=item; path=/";
		</script>
		<script type="text/javascript" src="scripts/function_fix_date.js">
		</script>
		<script type="text/javascript" src="scripts/function_check_run.js">
		</script>
		<script type="text/javascript" src="scripts/function_get_pleiades_place.js">
		</script>
		<script type="text/javascript" src="scripts/set_cookie.js">
		</script>
		<script type="text/javascript" src="scripts/function_clear_layers.js">
		</script>
		<script type="text/javascript" src="scripts/function_clear_controls.js">
		</script>
		<script type="text/javascript" src="scripts/leaflet/leaflet.js">
		</script>
		<script type="text/javascript" src="scripts/load_icons.js">
		</script>
		<script type="text/javascript" src="scripts/tile.stamen.js">
		</script>
		<script type="text/javascript" src="scripts/load_basemaps.js">
		</script>
<!-- Load jQuery library using plain JavaScript -->
		<script src="scripts/jquery.min.js">
		</script>
		<script type="text/javascript" src="scripts/load_navigation.js">
		</script>
		<script type="text/javascript" src="scripts/on_each_feature.js">
		</script>
		<script type="text/javascript" src="scripts/function_clear_filter.js">
		</script>
		<script type="text/javascript" src="scripts/function_layer_for_one_item.js">
		</script>
		<script type="text/javascript" src="scripts/function_get_item_data.js">
		</script>
		<script type="text/javascript" src="scripts/relocate_map.js">
		</script>

		<!-- php script that loads a variable 'biblio' into js -->
		<?php include 'scripts/get_biblio.php' ?>

		<script type="text/javascript">
			// Set a variable to indicate start-up
			// Cookies last a day, so they won't do.
// 			allPoints = [];

			// Create menu to select the way to format the data
			var selectmenu = document.getElementById("mymenu")
				selectmenu.onchange = function () {
				        layer_for_one_item();
				    }

			// Create map without layers since the user will do that.

			// Define the bounds for the zoomed out map to show all points
			// Could make this a calculated value based on range of points
			var
				bounds = [[55,-10.05],[30,39.5]];
			var map = L.map('map', {
			    minZoom: 3,
			    zoomSnap: .5,
			    zoomDelta: .5,
			    layers: [osm]
			});

			// Zoom out
			all();

			L.control.scale({
			    position: 'bottomright'
			}).addTo(map);

			// Clear the cookie on startup
			// Will generate a php error in json.php
			// var sqlquery = '';
			setCookie('sqlquery', 'dummy', '-1');

			// Load navigation instructions
			loadNavigation();

		function clickOnMapItem(itemId) {
			var id = parseInt(itemId);
			//get target layer by its id
			var layer = geojson.getLayer(id);
			//fire event 'click' on target layer
			layer.fireEvent('click');
			}
		</script>

		<script>
			// Get id number from the URL and use setCookie to map it
			// The .htaccess rewrite rule makes sure that the URL contains only numbers
			var url = window.location.pathname;
			var filename = url.substring(url.lastIndexOf('/')+1);
			setCookie('sqlquery', 'ID=' + filename, '1');
		</script>

		<script>
		    // Set the cookie back to maps mode. Not perfect, but at least keeps the no-position
		    // sites from showing after the window is closed.
			window.onbeforeunload = closingCode;
			function closingCode(){
			   document.cookie = "querytype=map; path=/";
			   return null;
			}
		</script>


	</body>
</html>

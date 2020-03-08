-- Gets the country and city (locality) for lat/long pairs that are on the clipboard (separated by newlines).
-- Leaves the result on the clipboard for pasting and further work in OpenOffice.
-- This outputs the country code along with the original line.
-- Uses geoname services with a username I had to get.

set myDocs to POSIX path of (path to documents folder)
set username to (do shell script "cat " & myDocs & "/geonames_username.txt")
set countryList to ""
set placeCount to 0
-- Slow it down a little to make sure we get all the results
set theDelay to 0.1

set placeList to the clipboard
set placeList to paragraphs of placeList
repeat with place in placeList
	--Save original entry for report at end
	set originalPlace to place
	--Remove extra spaces in and around the text
	set place to do shell script "echo " & place & "  | perl -pe 's/,/ /g' | xargs"
	--Remove non-numbers at the start and end of the text
	set place to do shell script "echo " & place & " | perl -pe 's/^.*?([0-9-].*)/\\1/' | perl -pe 's/(.*?)[A-Za-z]+/\\1/'  "
	if place is not "" then
		set placeCount to placeCount + 1
		set la to do shell script "echo " & place & " | perl -pe 's/(^[0-9\\.]+).*/\\1/'"
		set lo to do shell script "echo " & place & " | perl -pe 's/.*?([0-9\\.-]+$)/\\1/'"
		set country to do shell script "curl -s \"http://api.geonames.org/countryCode?lat=" & la & "&lng=" & lo & "&username=" & username & "\""
		-- Handle errors with some grace & keep output in the same format
		if length of country ­ 2 then set country to "XX"
		set countryList to countryList & originalPlace & tab & country & return
		delay theDelay
	end if
end repeat
if countryList is not "" then set the clipboard to countryList

display notification ("Your " & placeCount & " country searches are done.") with title "Country Code Search Results" sound name "beep"

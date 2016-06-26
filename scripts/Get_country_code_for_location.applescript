-- Gets the countries for lat/long pairs that are on the clipboard (separated by newlines).
-- Leaves the result on the clipboard for pasting and further work in OpenOffice.
-- This outputs only the country code, not any item ID, so keep the order in the original list.
-- Uses Google services, which jq isn't too happy about (or I can't get it to work right), hence the grep.
-- Conveniently though null results from the server result in empty lines in output.

set c to the clipboard
set theList to ""
set cmd to " | /usr/local/bin/jq -c '.results[0].address_components[]' | grep country | /usr/local/bin/jq '.short_name'"
set gglURI to "'http://maps.googleapis.com/maps/api/geocode/json?latlng="
set ggl2 to "&sensor=true'"
-- Slow it down a little to make sure we get all the results
set theDelay to 0.1

repeat with i in the paragraphs of c
	if the number of items of i > 0 then
		set theList to theList & (do shell script "curl -s -stdout " & gglURI & i & ggl2 & cmd) & return
		delay theDelay
	end if
end repeat

--Get rid of the quotation marks
set theList to replace(theList, "\"", "")

-- Quick search and replace with TID
on replace(origtext, ftext, rtext)
	set tid to AppleScript's text item delimiters
	set newtext to origtext
	set AppleScript's text item delimiters to ftext
	set newtext to the text items of newtext
	set AppleScript's text item delimiters to rtext
	set newtext to the text items of newtext as string
	set AppleScript's text item delimiters to tid
	return newtext
end replace

set the clipboard to theList
beep

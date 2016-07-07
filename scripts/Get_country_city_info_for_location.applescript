-- Gets the country and city (locality) for lat/long pairs that are on the clipboard (separated by newlines).
-- Leaves the result on the clipboard for pasting and further work in OpenOffice.
-- This outputs only the country codes and cities, not any item ID, so keep the order in the original list.
-- Uses Google services.

set theCount to 0
set c to the clipboard
set theList to ""
set cmd to " | /usr/local/bin/jq -c '.results[0].address_components[]'"
set filterC to " | /usr/local/bin/jq 'select(.types[0] == \"country\")' | /usr/local/bin/jq '.short_name'"
set filterL to " | /usr/local/bin/jq 'select(.types[0] == \"locality\")' | /usr/local/bin/jq '.short_name'"
set gglURI to "'http://maps.googleapis.com/maps/api/geocode/json?latlng="
set ggl2 to "&sensor=true'"
-- Slow it down a little to make sure we get all the results
set theDelay to 0.1

repeat with i in the paragraphs of c
	if the number of items of i > 0 then
		try
			set theItem to (do shell script "curl -s -stdout " & gglURI & i & ggl2)
			set statusMsg to (do shell script "echo " & (the quoted form of theItem) & " | /usr/local/bin/jq '.status'") & return & (do shell script "echo " & (the quoted form of theItem) & " | /usr/local/bin/jq '.error_message'")
			if statusMsg contains "\"OK\"" then
				set theItem to do shell script "echo " & (the quoted form of theItem) & cmd
			else
				if statusMsg contains "\"ZERO_RESULTS\"" then
					-- the API couldn't find it, so zero it out and ignore it later
					set theItem to ""
				else
					-- there was some other response from the server. Display it and quit.
					display alert "API Problem" message statusMsg & return & return & "Saving current list to the clipboard."
					exit repeat
				end if
			end if
			set theCount to theCount + 1
		on error errMsg
			if errMsg ­ "User canceled." then display alert "Problem" message "Unexpected error when contacting the server:" & return & errMsg
		end try
		if theItem ­ "" then
			try
				set theCountry to do shell script "echo " & (the quoted form of theItem) & filterC
			on error
				set theCountry to ""
			end try
			try
				set theCity to do shell script "echo " & (the quoted form of theItem) & filterL
			on error
				set theCity to ""
			end try
			set theList to theList & theCountry & ", " & theCity & return
		else
			set theList to theList & return
		end if
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
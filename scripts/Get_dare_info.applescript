-- Gets the DARE details for items whose ID are on the clipboard (separated by newlines).
-- Leaves the result on the clipboard for pasting and further work in OpenOffice.

set c to the clipboard
set theList to ""
-- Slow it down a little to make sure we get all the results
set theDelay to 0.1

repeat with i in the paragraphs of c
	try
		if the number of items of i > 0 then
			set theList to theList & (do shell script "curl -s -stdout http://imperium.ahlfeldt.se/api/geojson.php?id=" & i & " | /usr/local/bin/jq '.features[]' | /usr/local/bin/jq -c '[.properties.id, .properties.ancient, .geometry.coordinates[1], .geometry.coordinates[0], .properties.name, .properties.Pleiades, .properties.country]' | /usr/local/bin/jq '@csv' | sed 's/^\"//g' | sed 's/\"$//g'") & return
			--		delay theDelay
		end if
	on error errMsg number errNum
		display alert "Problem" message i & ": " & errMsg
	end try
end repeat

--Get rid of the escapes before quotation marks
set theList to replace(theList, "\\\"", "\"")

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

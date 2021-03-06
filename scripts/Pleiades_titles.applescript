-- Gets the Pleiades titles for IDs that are on the clipboard (separated by newlines).
-- Leaves the result on the clipboard for pasting and further work in OpenOffice.

set c to the clipboard
set theList to ""
set jq to "/usr/local/bin/jq"

repeat with i in the paragraphs of c
	if the number of items of i > 0 then
		set theList to theList & (do shell script "curl -s -stdout https://pleiades.stoa.org/places/" & i & "/json/ | " & jq & " '[.id, .title]' | " & jq & " '@csv' ") & return
	end if
end repeat

set theList to my replace(theList, "\\", "")
set theList to my replace(theList, "\"", "")
set theList to my replace(theList, "</span><span>", ", ")
set theList to my replace(theList, "</span>", "")

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


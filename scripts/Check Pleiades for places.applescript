-- Check temple URLs in Pleiades and only keep those that have a chance of appearing.
-- Open them in Safari for manual inspection.
-- Put the place names on the clipboard before running this.

-- Some variables
-- Only inspect max number of places. Pace yourself!
set max to 0
set counter to 0
set place to ""
set alreadyDone to {}
set stopscript to false

if (the clipboard) is not "" then
	set urlList to (do shell script "pbpaste | uniq")
	set urlCount to number of paragraphs of urlList
	set urlList to paragraphs of urlList
else
	display alert "Nothing to do!" message "There's nothing on the clipboard to work with."
	set stopscript to true
end if

if not stopscript then
	repeat until max > 0
		if urlCount > 10 then
			set reply to (display dialog "How many places do you want to check?" default answer 10)
			try
				set max to (the text returned of reply) as integer
				if max < 1 then display alert "Bad number" message "You need to enter a positive number. Try again!"
			on error
				display alert "Bad choice" message "That doesn't appear to be a number. Try again!"
			end try
		else
			set max to urlCount
		end if
	end repeat
	
	repeat with place in urlList
		-- Escape single quote marks
		set cleanPlace to replace(place, "'", "&#39;")
		-- Trim the string
		set cleanPlace to (do shell script "echo " & quoted form of cleanPlace & " | xargs")
		-- Escape the remaining (internal) space characters
		set cleanPlace to replace(cleanPlace, " ", "%20")
		-- Keep track of and don't repeat places
		if (cleanPlace is not "") and (alreadyDone does not contain cleanPlace) then
			set alreadyDone to alreadyDone & cleanPlace
			try
				set testURL to "https://pleiades.stoa.org/places/" & cleanPlace
				-- Just load places that are only numbers, assuming them to be valid
				if (do shell script "echo " & cleanPlace & " | perl -pe 's/[0-9]+//g' ") = "" then
					error 9999
				else
					set reply to (do shell script "curl -s '" & testURL & "' 2>/dev/null | grep 'New landing page for places'")
					-- Result is an error if the URL doesn't give Pleiades' "no idea" response.
					-- Lots of other reasons for errors, but assuming all is working well, this is the only one we need to worry about.
				end if
			on error errMsg number errNum
				set counter to counter + 1
				tell application "Safari" -- open a new window if this is the first URL; otherwise use a new tab
					if counter = 1 then
						make new document
						set windowID to the id of the front window -- use ID in case we're working in Safari
						set the URL of the current tab of window id windowID to testURL
					else
						make new tab in window id windowID with properties {URL:testURL}
					end if
				end tell
				if counter = max then exit repeat
			end try
		end if
	end repeat
	
	-- Done. Display info in notification
	if counter > 0 then
		display notification ("Found " & counter & " possible locations in Pleiades." & return & "Last entry: " & place) with title "Pleiades Place Search" sound name "beep"
	else
		display notification ("Sorry, no possible locations found in Pleiades." & return & "Last entry: " & place) with title "Pleiades Place Search" sound name "Basso"
	end if
	set the clipboard to place
end if

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

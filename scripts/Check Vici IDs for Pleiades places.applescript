-- Check Vici IDs in Pleiades and only keep those that have a match.
-- Open them in Safari for manual inspection.
-- Put the place IDs on the clipboard before running this.

-- Some variables
-- Only inspect max number of places. Pace yourself!
set max to 0
set counter to 0
set placeID to ""
set stopscript to false
set reply to ""

if (the clipboard) is not "" then
	set idList to get the clipboard
	set idList to paragraphs of idList
else
	display alert "Nothing to do!" message "There's nothing on the clipboard to work with."
	set stopscript to true
end if

if not stopscript then
	repeat until max > 0
		set reply to (display dialog "How many IDs do you want to check?" default answer 10)
		try
			set max to (the text returned of reply) as integer
			if max < 1 then display alert "Bad number" message "You need to enter a positive number. Try again!"
		on error
			display alert "Bad choice" message "That doesn't appear to be a number. Try again!"
		end try
	end repeat
	
	repeat with placeID in idList
		-- Assume the first number string in the item is the ID
		set cleanID to (do shell script "echo " & placeID & " | perl -pe 's/.*?([0-9]+).*/\\1/'")
		if cleanID is not "" then
			try
				set testURL to "http://vici.org/object.php?id=" & cleanID
				set reply to (do shell script "curl -s '" & testURL & "' | /usr/local/bin/jq '.properties.extIds // empty' | grep pleiades | perl -pe 's/.*pleiades:place=([0-9]+).*/\\1/'")
				-- Result is an error if the URL doesn't give Pleiades' "no idea" response.
				-- Lots of other reasons for errors, but assuming all is working well, this is the only one we need to worry about.
				if reply is not "" then
					set counter to counter + 1
					set placeURL to "https://pleiades.stoa.org/places/" & reply
					tell application "Safari" -- open a new window if this is the first URL; otherwise use a new tab
						if counter = 1 then
							make new document
							set windowID to the id of the front window -- use ID in case we're working in Safari
							set the URL of the current tab of window id windowID to placeURL
						else
							make new tab in window id windowID with properties {URL:placeURL}
						end if
					end tell
					if counter = max then exit repeat
				end if
			on error errmsg number errnum
				display alert errnum message "For ID " & placeID & ", we got the following error:\n" & errmsg
			end try
		end if
	end repeat
	
	-- Done. Display info in notification
	if counter > 0 then
		display notification ("Found " & counter & " possible locations in Pleiades." & return & "Last entry: " & placeID) with title "Vici ID Search" sound name "beep"
	else
		display notification ("Sorry, no possible locations found in Pleiades." & return & "Last entry: " & placeID) with title "Vici ID Search" sound name "Basso"
	end if
	set the clipboard to placeID
end if

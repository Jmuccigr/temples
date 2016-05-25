-- Get approximate counts for DARE entries

-- Set file location for output
set myDocs to POSIX path of (path to documents folder)
set myGitfile to myDocs & "github/local/temples/DARE_count.csv"

-- Initialize variable to hold results
set listCount to "ID	Count" & (ASCII character 10)

-- Valid IDs range from 1 to 128
repeat with i from 1 to 128
	set cmd to "curl -s http://dare.ht.lu.se/api/geojson.php?typeid=" & i
	-- Counting bytes since the returned values are all in one line.
	-- Subtracting 42 because that's how big a "0 results" value is.
	-- Dividing by 400 as a quick guess at how big the average entry is. Should be order-of-magnitude OK.
	set listCount to listCount & i & tab & (round (((do shell script cmd & "| wc -c") - 42) / 400)) & (ASCII character 10)
end repeat

set the clipboard to listCount as string

do shell script "echo '" & listCount & "' > " & myGitfile

beep

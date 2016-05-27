-- Get approximate counts for DARE entries
-- Uses a tmp file to avoid some difficulty using curl

-- Set file location for output
set myDocs to POSIX path of (path to documents folder)
set myGitfile to myDocs & "github/local/temples/DARE_count.csv"
set tmpFile to myDocs & "github/local/temples/dare.json"

-- Initialize variable to hold results & make sure tmp file exists
set listCount to "ID	Count" & (ASCII character 10)
do shell script ("touch " & tmpFile)

-- Valid IDs range from 1 to 128
repeat with i from 1 to 128
	try
		-- Get the raw data
		do shell script ("curl -s http://dare.ht.lu.se/api/geojson.php?typeid=" & i & " > " & tmpFile)
		-- Convert it to pretty format so items can be counted
		do shell script ("/Users/john_muccigrosso/.rbenv/shims/ppjson -i -f  " & tmpFile)
		-- Count items using grep. Assume error means grep found nothing
		try
			set itemCount to (do shell script ("grep " & quote & "name" & quote & " " & tmpFile & " | wc -l ")) as integer
		on error
			set itemCount to 0
		end try
	on error errMsg
		display dialog i & return & errMsg as string
	end try
	-- Only add ID to list if it's represented in the data.
	if itemCount > 0 then set listCount to listCount & i & tab & itemCount & (ASCII character 10)
end repeat

-- Write results to file
do shell script "echo '" & listCount & "' > " & myGitfile

-- Delete tmp file
do shell script "rm " & tmpFile

beep

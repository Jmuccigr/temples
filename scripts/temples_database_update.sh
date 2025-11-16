#!/bin/bash
# Script to push updates from csv to local mysql database

# Set up some variables
delete=false
compareTables=true
checkSize=true
dryRun=false
local=true
cmdStr=''
me=$USER
declare -a deleteList
declare -a dbList
declare -a fileList
tableList="biblio citations temples" # Shouldn't have used biblio. More work!
tableList=($tableList)
filenameList="bibliography citations temples"
filenameList=($filenameList)

PROGNAME=$(basename $0)

# Check whether the database is running by checking for mysql
sqltest=`ps -x | grep mysqld | grep -v grep`
MAMP=`ps -x | grep 'MAMP.app' | grep -v grep`

# Add tables based on switches

# Read flags
#
while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "$PROGNAME [options]"
      echo ""
      echo "Load csv files into the temples databases. Defaults to local database."
      echo ""
      echo "options:"
      echo "-h, --help       Show this brief help"
      echo "-b, --biblio     force updating of the bibliography table"
      echo "-c, --citations  force updating of the citations table"
      echo "-t, --temples    force updating of the temples table"
      echo "-a, --all        force updating of all three tables"
      echo "-d, --delete     remove all entries from the table before updating (SQL 'truncate')"
      echo "-y, --dryrun     don't change any files (overrides forced updating switches)"
      echo "-i, --ignore     ignore csv file size and just do the update"
      echo "-m, --manual     only update tables indicated in the command"
      echo ""
      echo "-r, --remote     update remote tables instead of the default local ones"
      exit 0
      ;;
    -b|--biblio)
      dbList+=("biblio")
      fileList+=("bibliography")
      shift
      ;;
    -c|--citations)
      dbList+=("citations")
      fileList+=("citations")
      shift
      ;;
    -t|--temples)
      dbList+=("temples")
      fileList+=("temples")
      shift
      ;;
    -a|--all)
      dbList=("biblio" "citations" "temples")
      fileList=("bibliography" "citations" "temples")
      compareTables=false
      shift
      ;;
    -d|--delete)
      deleteList=("bibliography" "citations" "temples")
      delete=true
      shift
      ;;
    -i|--ignore)
      checkSize=false
      shift
      ;;
    -y|--dryrun)
      dryRun=true
      shift
      ;;
    -m|--manual)
      compareTables=false
      shift
      ;;
    -r|--remote)
      local=false
      shift
      ;;
   *)
      break
      ;;
  esac
done

# Get the database to update. Default is local.
if ! $local
then
    pwd=$(dirname "$0")
    pwd=$(dirname "$pwd")
    cmdStr=--defaults-extra-file="$pwd"/forbidden/sql_remote_config.cnf
    echo -e "Working with remote database.\n"
else
    echo -e "Working with local database.\n"
fi

if [[ "$local" == "true" && $sqltest == '' ]]
then
    echo ""
    read -t 10 -p "The database doesn't seem to be open. Start it? (Y/n) " startReply
    if [[ $startReply == "n" ]]
    then
	    exit 0
    fi
    if [[ $MAMP == '' ]]
    then
        open -j '/Applications/MAMP/MAMP.app'
        echo ""
        echo "MAMP is not running. Let me try to start it..."
        sleep 10
        # Make sure MAMP is running now
        MAMP=`ps -x | grep 'MAMP.app' | grep -v grep`

        # Make sure the database is running by checking for mysql
        sqltest=`ps -x | grep mysqld | grep -v grep`
        if [[ $MAMP = '' ]]
        then
            echo "That didn't work. Check it out."
            exit 0
        fi
    fi
    # Check again that the database is running by checking for mysql
    sqltest=`ps -x | grep mysqld | grep -v grep`
    if [[ $sqltest = '' ]]
    then
        # Explicitly tell MAMP to open the database
        osascript -e 'tell application "MAMP.app"' -e 'activate' -e 'tell application "System Events"' -e 'keystroke "l" using command down' -e 'keystroke "h" using command down' -e 'end tell' -e 'end tell'
        sleep 1
        osascript -e 'tell application "iTerm2" to activate'
        echo ""
        echo "MAMP is running. Let me try to start the databases..."
        sleep 4
        sqltest=`ps -x | grep mysqld | grep -v grep`
        if [[ $sqltest == '' ]]
        then
            echo "That didn't work. Check it out."
            exit 0
        fi
    fi
    echo ""
    echo "OK, that seemed to work, let's go..."
fi

# Now count the rows in the local csv files
# Could really make this depend on the switches, but it's probably good to confirm files exist
biblioCount=`cat ~/Documents/github/local/temples/bibliography.csv | wc -l`
citationCount=`cat ~/Documents/github/local/temples/citations.csv | wc -l`
templeCount=`cat ~/Documents/github/local/temples/temples.csv | wc -l`

# Make sure the csv file are some minimal length to guard against some weird error
if  $checkSize
then
    if (( $biblioCount < 100 || $citationCount < 100 || $templeCount < 100 ))
    then
        echo 'The csv files seem too small. Please check them.'
        echo 'Use "-i" to skip this check.'
        exit 1
    fi
fi
fileCounts=($biblioCount $citationCount $templeCount)

# Now count the rows in the database tables unless we're forcing all of them regardless
# or we're only doing the indicated ones
if [ "$compareTables" == true ] || [ "$dryRun" == true ]
then
sqloutput=`
mysql $cmdStr << EOF
USE romerese_temples
SELECT count(*) FROM biblio;
SELECT count(*) FROM citations;
SELECT count(*) FROM temples;
EOF
`

    # On error accessing the database (probably a IP address problem), just quit as the script reports the error.
   status=$?
   if [ $status -ne 0 ]; then
       echo -e '\007Problem connecting to the database.\n'
       exit 1
   fi

    sqlValues=($sqloutput)
    sqlCount=(${sqlValues[1]} ${sqlValues[3]} ${sqlValues[5]})

    # Compare the two sets of row counts
    for i in {0..2}
    do
        bigger=false
        if [ ${fileCounts[$i]} != ${sqlCount[$i]} ]
        then
            echo ${tableList[$i]}" table needs to be updated"
            (("${sqlCount[$i]}" > "${fileCounts[$i]}")) && bigger=true
            if [[ $bigger == "true" && !$delete=="true" ]]
            then
                echo "    NB More rows on server than locally ("${sqlCount[$i]}" vs "${fileCounts[$i]}")."
                if [ "$dryRun" != true ]
                then
                    read -t 10 -p "    Do you want to delete the server rows? (y/N) " deleteReply
                    if [[ $deleteReply == "y" ]]
                    then
                        deleteList+=(${tableList[$i]})
                    fi
                fi
            fi
            dbList+=(${tableList[$i]})
            fileList+=(${filenameList[$i]})
        fi
    done
fi

echo ""

# Push the updates to the database
# Could use a sanity check

unique=($(printf "%s\n" "${dbList[@]}" | sort -u ))
fileList=($(printf "%s\n" "${fileList[@]}" | sort -u ))
ct=${#unique[@]}
if (( $ct == 0 ))
then
    echo "Nothing to update!"
elif ! $dryRun
then
    ct=$((ct-1))
    for i in $( seq 0 $ct )
    do
        db=${unique[$i]}
        filename=${fileList[$i]}
        echo -n "Trying to update "$db" table..."
        if [[ $deleteList =~ (^|[[:space:]])${db}($|[[:space:]]) ]]
        then
            echo -n "deleting the entries in table "$db"..."
mysql $cmdStr << EOF
USE romerese_temples
truncate table ${db};
EOF
        fi
mysql $cmdStr << EOF
USE romerese_temples
load data local infile '/Users/${me}/Documents/github/local/temples/${filename}.csv' replace into table ${db} character set utf8 fields terminated by ',' enclosed by '"';
EOF
        echo "done."
        echo ""
    done
    echo "Database updated!"
else
    echo "No action taken because this is a dry run."
fi
echo ""

# Ask to quit MAMP if we're running local
if [[ $MAMP != '' ]]  &&  [[ "$local" == "true" ]]
then
    read -t 10 -p 'Quit MAMP? (y/N)' quitReply
    if [[ $quitReply == "y" ]]
    then
        osascript -e 'tell application "MAMP" to quit' &
    fi
fi

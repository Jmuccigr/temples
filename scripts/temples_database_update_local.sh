#!/bin/bash
# Script to push updates from csv to local mysql database

# Make sure the database is running by checking for mysql
test=`ps -x | grep mysqld | grep -v grep`

if [[ $local && $test == '' ]]
then
    echo "The database doesn't seem to be open. Quitting."
    exit 1
fi

# Set up some variables
delete=false
compareTables=true
checkSize=true
dryRun=false
local=true
cmdStr=''
me=$(whoami)
declare -a dbList
declare -a fileList
tableList="biblio citations temples" # Shouldn't have used biblio. More work!
tableList=($tableList)
filenameList="bibliography citations temples"
filenameList=($filenameList)

# Add tables based on switches

# Read flags
#
while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "$PROGNAME [options]"
      echo ""
      echo "Load csv files into local temples database."
      echo ""
      echo "options:"
      echo "-h, --help       Show this brief help."
      echo "-b, --biblio     force updating of the bibliography table"
      echo "-c, --citations  force updating of the citations table"
      echo "-t, --temples    force updating of the temples table"
      echo "-a, --all        force updating of all three tables"
      echo "-d, --delete     remove all entries from the table before updating (truncate)"
      echo "-y, --dryrun     don't change any files"
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
if [ "$compareTables" = true ] || [ "$dryRun" = true ]
then
sqloutput=`
mysql $cmdStr << EOF
USE romerese_temples
SELECT count(*) FROM biblio;
SELECT count(*) FROM citations;
SELECT count(*) FROM temples;
EOF
`

    sqlValues=($sqloutput)
    sqlCount=(${sqlValues[1]} ${sqlValues[3]} ${sqlValues[5]})

    # Compare the two sets of row counts
    for i in {0..2}
    do
        if [ ${fileCounts[$i]} != ${sqlCount[$i]} ]
        then
            echo ${tableList[$i]}" table needs to be updated"
            if (( "${sqlCount[$i]}" > "${fileCounts[$i]}" ))
            then
                echo "    NB More rows on server than locally ("${sqlCount[$i]}" vs "${fileCounts[$i]}"). You may want to delete the server rows."
            fi
            dbList+=(${tableList[$i]})
            fileList+=(${filenameList[$i]})
        fi
    done
fi

echo ""

# Push the updates to the database
# Could use a sanity check

ct=${#dbList[@]}
if (( $ct == 0 ))
then
    echo "Nothing to update!"
elif ! $dryRun
then
    unique=($(printf "%s\n" "${dbList[@]}" | sort -u ))
    fileList=($(printf "%s\n" "${fileList[@]}" | sort -u ))
    ct=$((ct-1))
    for i in $( seq 0 $ct )
    do
        db=${unique[$i]}
        filename=${fileList[$i]}
        echo -n "Trying to update "$db" table..."
        if $delete
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

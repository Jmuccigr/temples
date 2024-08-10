function timeout () {
    setTimeout(function() 
        {
            if (counter == 0) {
            alert('No sites were found matching the search criteria.')
            }
        },
        2000)
    ;
}

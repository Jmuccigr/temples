function fixDate(d) {
	d=d.toString()
    if (d.substring(0,1) == '-') {
    	return d.substring(1,d.length) + ' BCE'}
    else {
    	return d;
    }
}

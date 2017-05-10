function clearFilter () {
	// Reset filter
	document.getElementById("first").value = '';
	document.getElementById("firstOp").value = 'contains';
	document.getElementById("firstTxt").value = '';
	document.getElementById("second").value = '';
	document.getElementById("secondOp").value = 'contains';
	document.getElementById("secondTxt").value = '';
	document.getElementById("third").value = '';
	document.getElementById("thirdOp").value = 'contains';
	document.getElementById("thirdTxt").value = '';
	// Reset cookie
	setCookie('sqlquery', 'dummy', '-1');
    // Send change event to menu that selects overlay layers so it updates the map
    selectmenu.dispatchEvent(new Event('change'));
	}

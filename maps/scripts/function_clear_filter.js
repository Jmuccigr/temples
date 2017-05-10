function clearFilter () {
	document.getElementById("first").value = '';
	document.getElementById("firstOp").value = 'contains';
	document.getElementById("firstTxt").value = '';
	document.getElementById("second").value = '';
	document.getElementById("secondOp").value = 'contains';
	document.getElementById("secondTxt").value = '';
	document.getElementById("third").value = '';
	document.getElementById("thirdOp").value = 'contains';
	document.getElementById("thirdTxt").value = '';
	setCookie(name, value, days);
	}

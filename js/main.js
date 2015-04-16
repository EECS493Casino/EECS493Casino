

function loadContent(_this) {
		$loc = $(_this).attr("id") + ".html";
		// window.alert($loc);
		$("#content").load($loc);
}

$(document).ready(function(){
	$('#content').load("home.html");
});

var cheatsOn = false;

var cheats = function() {
	var x = document.getElementById("myonoffswitch").checked;
	if(x == true)
	{
		cheatsOn = true;
	}
	else
	{
		cheatsOn = false;
	}

}

var level = function(input){


	var x = document.getElementById("levelswitch").checked;
	if(x == true)
	{
		//easy
		window.alert("Difficulty feature not implemented yet.");
	}
	else
	{
		//difficult
		window.alert("Difficulty feature not implemented yet.");
	}

}


var music = function(input){


	var x = document.getElementById("musicswitch").checked;
	if(x == true)
	{
		//music on
		window.alert("Music feature not implemented yet.");
	}
	else
	{
		//music off
		window.alert("Music feature not implemented yet.");
	}

}


function initBankSlider(JQueryObj, bank) {
	JQueryObj.slider({
		range: "min",
		value: bank.wager,
		min: 1,
		max: bank.bankRoll,
		orientation : "vertical",
		slide: function(event, ui) {
			bank.updateWager(ui.value);
		}
	});
}

function disableSlider(JQueryObj) {
	JQueryObj.slider({ disabled: true });
}

function enableSlider(JQueryObj) {
	JQueryObj.slider({ disabled: false });
}
 function startGame() {
	 game.newGame();
 }

 function updateSliderValues(JQueryObj, bank) {
	 	if (bank.bankRoll > 0) {
	 		if (bank.wager > bank.bankRoll) {
	 			JQueryObj.slider("option", "value", Math.ceil(bank.bankRoll / 10));
	 			bank.updateWager(Math.ceil(bank.bankRoll / 10));
	 		}
	 		JQueryObj.slider("option", "max", bank.bankRoll);
	 	} else {
	 		disableSlider(JQueryObj);
	 		JQueryObj.slider("option", "value", 1);
	 		JQueryObj.slider("option", "max", 1);
	 		alert("Looks like you've lost all your money.  Please come again soon!");
	 	}
}

$(function() {
    $( ".draggable" ).draggable();
});

function updateCheatsVar (){
	if ($('#myonoffswitch'))
		$('#myonoffswitch').prop('checked', cheatsOn);
	console.log(cheatsOn);
}

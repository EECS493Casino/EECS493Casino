$(function(){
	$(".button_link").click(function(){
		$loc = $(this).attr("id") + ".html";
		// window.alert($loc);
		$("#content").load($loc);
	});
});




var cheats = function() {
	var x = document.getElementById("myonoffswitch").checked;
	if(x == true)
	{
		//cheats on 
		// window.alert("cheats on");
	}	
	else
	{
		//cheats off 
	}	
    
}

var level = function(input){

	var lvl = input.value;
	
	if(input.value == "hard")
	{
		// window.alert(input.value);
	}	
	else{

	}

}

function initBankSlider(JQueryObj, bank) {
	JQueryObj.slider({
		range: "min",
		value: bank.wager,
		min: 1,
		max: bank.bankRoll,
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
	 $("#startGame").hide();
	 $("#buttonholder").show();
	game.updateUI();
	 game.bank.bet();
	 game.bank.disable();
 }
 
 function newGame() {
	 $("#startGame").hide();
	 $("#buttonholder").show();
	 game.newGame();
 }
 
$(function() {
    $( ".draggable" ).draggable();
});

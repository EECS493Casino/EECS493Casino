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

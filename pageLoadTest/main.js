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


	var x = document.getElementById("levelswitch").checked;
	if(x == true)
	{
		//easy
		//window.alert("easy");
	}	
	else
	{
		//difficult
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

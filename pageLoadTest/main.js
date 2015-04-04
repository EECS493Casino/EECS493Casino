$(function(){
	$(".button_link").click(function(){
		$loc = $(this).attr("id") + ".html";
		window.alert($loc);
		$("#gamecontent").load($loc);
	});
});




var cheats = function() {
	var x = document.getElementById("myonoffswitch").checked;
	if(x == true)
	{
		//cheats on 
	}	
	else
	{
		//cheats off 
	}	
    
}

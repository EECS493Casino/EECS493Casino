$(function(){
	$(".button_link").click(function(){
		$loc = $(this).attr("id") + ".html";
		$("#content").load($loc);
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

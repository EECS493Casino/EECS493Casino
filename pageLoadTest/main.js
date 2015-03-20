$(function(){
	$(".button_link").click(function(){
		$loc = $(this).attr("id") + ".html";
		$("#content").load($loc);
	});
});

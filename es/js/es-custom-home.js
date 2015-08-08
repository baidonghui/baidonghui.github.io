function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return "http://www.baidu.com";
}

$(document).ready(function() {
	$("#viewer", parent.document.body).attr("src", GetQueryString("url"));	
	$('li').removeClass("current");
	$(".menu .hover").addClass("current");
});
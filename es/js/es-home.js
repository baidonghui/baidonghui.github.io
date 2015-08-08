$(document).ready(function() {
	$("li").click(function() {
		var urlframe = $(this).attr("esVaule");
		var urlopen = $(this).attr("esOpenVaule");
		if (urlopen != undefined) {
			window.open(urlopen);
		}
		if (urlframe != undefined) {
			$("#viewer", parent.document.body).attr("src", urlframe);
			$('li').removeClass("current");
			$(".menu .hover").addClass("current");
		}
	});

	$('a[rel*=leanModal]').leanModal({
		top: 200,
		closeButton: ".modal_close"
	});
});
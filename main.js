$(document).ready(function () {
	amend("echo \"Hello, world! :)\"");
});

function amend(string){
	if (string.length <= 0) return;
	$("#cmd").append(string[0]);
	string = string.substr(1);
	setTimeout(function(){
		amend(string);
	}, 200);
}

function suppr(){
	string = $("#cmd").html();
	if (string.length <= 0) return;
	$("#cmd").html(string.slice(0,string.length-1));
	setTimeout(suppr, 100);
}

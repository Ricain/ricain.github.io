var jean = {
	lang : "",
	detect : function() {
		return (window.navigator.userLanguage || window.navigator.language).substr(0, 2);
	},
	update : function($lang) {
		if($lang==this.lang) return;
		if($lang!="en" && $lang!="fr") $lang = "en";
		this.lang = $lang;
		if($lang == "fr") {
			$("#r-fr").show();
			$("#r-en").hide();
			$("#s-fr").addClass("active");
			$("#s-en").removeClass("active");
		}
		else if ($lang == "en") {
			$("#r-fr").hide();
			$("#r-en").show();
			$("#s-fr").removeClass("active");
			$("#s-en").addClass("active");
		}
	}
}

$(document).ready(function() {
	$("#s-fr").click(function(){
		jean.update("fr");
	});
	$("#s-en").click(function(){
		jean.update("en");
	});
	jean.update(jean.detect());
});

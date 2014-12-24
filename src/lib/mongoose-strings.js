var strings = {};

strings.makeSafe = function(str) {
	str = String(str);
	var re = /\$/gi;
	str =  str.replace(re, "U+FF04");
	re = /\./gi;
	return str.replace(re, "U+FF08"); 
};

strings.makeViewable = function(str) {
	
	if(!strings.exists(str)) return "";

	var re = /U\+FF04/gi;
	str = str.replace(re, "$");
	re = /U\+FF08/gi;
	str = str.replace(re, ".");
	re = /u\/\+FF08/gi;
	return str.replace(re, ".");
	
};

strings.trim = function(s)
{
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	return s.substring(l, r+1);
};

strings.exists = function(str) {
	if(typeof str === "undefined" || str == "undefined") return false;
	try { 
		if(str.length === 0) return false;
	} catch (e) {
		return false; 
	}
	if(str === "") return false;
	
	return true;
};

strings.tidy = function(pat, str) {
	var ptn = new RegExp(pat, "gi");
	return str.replace(ptn, "");
};

strings.listify = function(pat, str) {
	var ptn = new RegExp(pat, "gi");
	return str.replace(ptn, ", ");
};

strings.currency = function(str) {
	if(Number(str) == NaN) {
		return "$0.00";
	}
	
	//Get Currency Function
	return "$" + Number(str).toFixed(2);
};

strings.toCurrency  = strings.currency;

strings.spaceCamels = function(str) {
	   return str.replace(/([A-Z])/g, ' $1')
	    .replace(/^./, function(str){ return str.toUpperCase(); })
	    .replace(/U\sP\sS/g, "UPS");
};

strings.camelSpace = function(str) {
	return str.replace(/\s/g, "_");
};

strings.getVideo  = function(str) {
	var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = str.match(regExp);
	if (match&&match[2].length==11){
	    return strings.makeSafe(match[2]);
	}else{
		return false;
	}
};


strings.titleCase = function (txt) {
    return txt.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

exports.strings = strings;
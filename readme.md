#Mongoose Strings
##A tiny library for managing strings in mongo documents.

Paranoia is your friend, and as I was reading the mongo documentation I came across a section that outlined the fact that while “;” is perfectly safe in mongo, neither “.” or “$” are 100% safe.

As I hadn’t seen any documentation around escaping these characters in Mongoose I started making it regular practice to include a few regexp.replace() calls in anything that touched both mongoose and HTML.

Originally I was doing this in just an  helper, but as I now do it for every project I’ve made it into it’s own module (also this was a good excuse for me to make my first module as a learning exercise).

Along the way I started padding the helper out with a few other quick and dirty functions that have come to be useful in final output of strings from mongoose.

##API:

###CORE

####Mongoose-Strings.exists(string)
A simple wrapper for for the following:

	if(typeof str === "undefined" || str == "undefined") return false;
	try { 
		if(str.length === 0) return false;
	} catch (e) {
		return false; 
	}
	if(str === "") return false;
	
	return true;

This is included primarily because both makeSafe and makeViewable will short circuit their output to an empty string if a non-string is passed.

####Mongoose-Strings.makeSafe(string)
Takes a string and makes it “mongo safe”.  If you don not plan on calling this function, there are probably better string handling modules out there, I haven’t tested enough to make a recommendation, but the reality is; mongoose-strings is really all about this little bit of paranoia.

####Mongoose-Strings.makeViewable( string )
Takes a mongo-safe string and makes it human readable.  I generally pass mongoose-strings (aliased to strings) to my template engine and call strings.makeViewable inline to ensure proper output formatting


###Housekeeping:
####Mongoose-Strings.trim(string) 
Standard string trimmer, remove LPad and RPad space characters.

####Mongoose-Strings.tidy(string, pattern)
Given a string and a pattern, replaces all instances of the pattern with “” and returns the string.  

####Mongoose-Strings.listify(string, pattern)
Given a string and a pattern calls a gi replace of the pattern with “, “

####Mongoose-Strings.currency(str), Mongoose-Strings.toCurrency(string)
Given a string that is a valid number returns $number.00 or $number.number as applicable
Given a string that is not a valid number returns $0.00
In short, a nice simple default for all possible currency circumstances.

####Mongoose-Strings.camelSpace(string) and Mongoose-Strings.spaceCamels(string)
Takes a string and camelSpaces, or un-camelSpaces accordingly.

####Mongoose-Strings.getVideo(string) {
Takes a string, normally a URL and pulls out the video portion when present.  This is invaluable for those times when you just want to store a reference to a youtube video for a client to include inline to their page.  You know you’ve done it.


####Mongoose-Strings.titleCase(string) {
Yup, takes a string and returns the Title Cased Version.

And that’s it.  This is not meant to be comprehensive or heavy, just a few simple bundled shortcuts that I’ve found useful, and maybe you will too. 


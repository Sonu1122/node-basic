var counter = function(arr){
	return 'There are '+arr.length+' elements in this array.';
};

var fullname = function(firstName,lastName){
	this.firstName = firstName;
	this.lastName = lastName;
	var fullName = this.firstName+' '+this.lastName;
	return 'The fullname is '+fullName;
}

var exports = {'counter':counter,'name':fullname};

module.exports = exports;
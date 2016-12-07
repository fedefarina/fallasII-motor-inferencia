"use strict";

function Consecuence(fieldName, value) {
	this.fieldName = fieldName;
	this.value = value;
}

Consecuence.prototype.apply = function(subject) {
	subject[this.fieldName] = this.value;
}

Consecuence.prototype.equals = function(consecuence) {
	return ((this.fieldName == Object.keys(consecuence)[0]) && (this.value == Object.values(consecuence)[0]))
}

module.exports = Consecuence;
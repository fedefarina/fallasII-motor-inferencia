"use strict";

function Condition(subjectName, equalsTo) {
	this.subjectName = subjectName; 
	this.equalsTo = equalsTo;
}

Condition.prototype.evaluate = function(subject) {
	return subject[this.subjectName] == this.equalsTo;
}

module.exports = Condition;
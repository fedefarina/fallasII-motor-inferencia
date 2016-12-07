"use strict";

var BackwardStrategy = require('./backward-chaining/BackwardStrategy');
var ForwardStrategy = require('./forward-chaining/ForwardStrategy');


var AlgorithmFactory = function() {	
}

AlgorithmFactory.prototype.getAlgorithm = function(type){
	if (type == "b") {
		return new BackwardStrategy();
	} else if (type == "f") {
		return new ForwardStrategy();
	} 
	throw new Error("Invalid Algorithm Type")
}

module.exports = AlgorithmFactory;
"use strict";

var Condition = require('./Condition');
var Consecuence = require('./Consecuence');

function Rule(data) {
	
	this.name = data.rule.name;
	this.conditionObject = data.rule.conditionObject;
	this.fields = data.rule.fields;
	this.condition = new Condition(data.condition.subjectName,data.condition.equalsTo);
	this.consecuence = new Consecuence(data.consecuence.fieldName,data.consecuence.value);

}

Rule.prototype.evaluate = function(knowledgeBases) {
	var ruleSuccess = false;
	for (var knowledgeBase of knowledgeBases) {
		ruleSuccess = this.condition.evaluate(knowledgeBase);
		if (ruleSuccess) {
			this.consecuence.apply(knowledgeBase);
		}
	}
	return ruleSuccess;
}

Rule.prototype.validateFields = function(knowledgeBase) {
	for (var field of this.fields) {
		if (knowledgeBase[field] != undefined)
			return true;
	}
	return false;
}

Rule.prototype.hasConsequence = function(testConsequence) {
	console.log("RuleCons,HypCons",testConsequence,this.consecuence)
	return (this.consecuence.equals(testConsequence))
}


module.exports = Rule;
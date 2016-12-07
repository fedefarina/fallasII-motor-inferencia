"use strict";

var RuleSet = require('../RuleSet');
var KnowledgeBase = require('../KnowledgeBase');

function InferenceEngine() {
    /* RuleSet */
    this.ruleSet = null;
    /*KnowledgeBase*/ 
    this.knowledgeBase = null; 
}

InferenceEngine.prototype.setRuleSet = function(ruleSet){ 
    this.ruleSet = ruleSet;
} 

InferenceEngine.prototype.setKnowledgeBase = function(knowledgeBase){ 
    this.knowledgeBase = knowledgeBase;
} 


module.exports = InferenceEngine;
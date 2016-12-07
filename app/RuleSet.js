"use strict";

var Rule = require('./Rule');

function RuleSet() {
    this.rules = {};
    this.rulesTree = {};
}

RuleSet.prototype.getRules = function(){
    return this.rules;
}

RuleSet.prototype.addRule = function(data){
    
    if (this.rules[data.rule.name] != undefined) {
        throw new Error("Duplicate Rule Exception")
    }

    this.rules[data.rule.name] = new Rule(data);

    //TODO: Chequear esto
    if (this.rulesTree[data.rule.fields] == undefined) {
        this.rulesTree[data.rule.fields] = [data];
    } else {
        this.rulesTree[data.rule.fields].push(data);
    }
}

Object.values = function (obj) {
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
}

RuleSet.prototype.getApplyingRules = function(knowledgeBases){
    var  applyingRules = [];
    for (var knowledgeBase of knowledgeBases) {
        applyingRules = Object.values(this.rules).filter(function(rule){
            return rule.validateFields(knowledgeBase);
        }); 
    }
    return applyingRules;
}


module.exports = RuleSet;
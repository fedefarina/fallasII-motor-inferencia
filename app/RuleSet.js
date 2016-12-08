"use strict";

var Rule = require('./Rule');

function RuleSet() {
  this.rules = {};
  this.rulesTree = {};
}

RuleSet.prototype.getRules = function () {
  return this.rules;
}

RuleSet.prototype.addRule = function (data) {

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
  const vals = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      vals.push(obj[key])
    }
  }
  return vals
}

RuleSet.prototype.getApplyingRules = function (knowledgeBases) {
  var applyingRules = Object.values(this.rules)
  knowledgeBases.map((knowledgeBase) => {
    applyingRules = applyingRules
    .filter(function (rule) {
      return knowledgeBase[rule.consecuence] != rule.consecuence.value
    })
  })
  console.log(applyingRules)
  return applyingRules
}

module.exports = RuleSet
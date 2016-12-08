"use strict";
const AlgorithmFactory = require('./strategys/AlgorithmFactory');
const RuleSet = require('./RuleSet');
const KnowledgeBase = require('./KnowledgeBase');

const RulesManager = function (executionType) {

  this.algorithmFactory = new AlgorithmFactory(executionType);
  this.executionType = executionType;
  this.ruleSet = new RuleSet();
  this.knowledgeBase = new KnowledgeBase();
  this.algorithm = undefined;
  this.hypothesis = undefined;
}

RulesManager.prototype.setRules = function (rules) {
  rules.map((rule) => {
    this.ruleSet.addRule(rule);
  })
}

RulesManager.prototype.setKnowledgeBase = function (knowledgeBase) {
  knowledgeBase.map((knowledge) => {
    this.knowledgeBase.addKnowledge(knowledge);
  })
}

RulesManager.prototype.setHypothesis = function (hypothesis) {
  this.hypothesis = hypothesis;
}

RulesManager.prototype.getHypothesis = function () {
  return this.hypothesis;
}

RulesManager.prototype.getRuleSet = function () {
  return this.ruleSet;
}

RulesManager.prototype.getKnowledgeBase = function () {
  return this.knowledgeBase;
}

RulesManager.prototype.setInferenceStrategy = function (type) {
  this.executionType = type;
  this.algorithm = this.algorithmFactory.getAlgorithm(type);
}

RulesManager.prototype.run = function () {
  this.algorithm.setRuleSet(this.ruleSet);
  this.algorithm.setKnowledgeBase(this.knowledgeBase);
  //TODO: Refactor
  console.log('this.executionType', this.executionType);
  if (this.executionType == "b") {
    this.algorithm.setHypothesis(this.hypothesis);
  }

  return this.algorithm.run();

}

module.exports = RulesManager;
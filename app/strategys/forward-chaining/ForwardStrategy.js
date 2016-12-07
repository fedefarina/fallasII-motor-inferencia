"use strict";

var InferenceEngine = require('../InferenceEngine');

ForwardStrategy.prototype = new InferenceEngine();

function ForwardStrategy() {
}

Array.prototype.diff = function (a) {
  return this.filter(function (i) {
    return a.indexOf(i) < 0;
  });
};

ForwardStrategy.prototype.run = function () {
  console.log("ForwardStrategy run");
  var rulesLeft = this.ruleSet.getApplyingRules(this.knowledgeBase.getKnowledgeBase());
  var appliedRules = [];
  var iterations = 1;

  console.log('STARTING forward chaining algorithm')
  console.log("Initial Knowledge:", this.knowledgeBase.getKnowledgeBase());

  while (rulesLeft.length > 0) {
    console.log('******************')
    console.log('ITERATION ', iterations);
    console.log('******************')
    console.log("There are ", rulesLeft.length, " rules to apply. Using the first one");
    var firstRule = rulesLeft[0];
    console.log('Evaluating rule ', firstRule.name, ' : ', firstRule.conditionObject)
    var result = firstRule.evaluate(this.knowledgeBase.getKnowledgeBase());
    console.log('Result: ', result)
    console.log('Partial Knowledge: ', this.knowledgeBase.getKnowledgeBase())
    appliedRules.push(firstRule);
    rulesLeft = this.ruleSet.getApplyingRules(this.knowledgeBase.getKnowledgeBase()).diff(appliedRules);
    iterations++
  }
  console.log('Forward chaining algorithm took ', iterations - 1, ' iterations')
  console.log('******************************************************')
  console.log('******************************************************')
  console.log('Final Knowledge')
  console.log('******************************************************')
  console.log('******************************************************')
  console.log(this.knowledgeBase.getKnowledgeBase())

}

module.exports = ForwardStrategy;
"use strict";

var InferenceEngine = require('../InferenceEngine');

BackwardStrategy.prototype = new InferenceEngine();

function BackwardStrategy(){ 
    this.hypothesis = null;
} 

BackwardStrategy.prototype.setHypothesis = function(hypothesis){ 
    this.hypothesis = hypothesis;
}

BackwardStrategy.prototype.canProveHypothesis = function(){ 
    for (var knowledge of this.knowledgeBase.getKnowledgeBase()) {
        if (knowledge[Object.keys(this.hypothesis)[0]] != undefined) {
                return (knowledge[Object.keys(this.hypothesis)[0]] == Object.values(this.hypothesis)[0]);
        }
    }
    return false;
}

BackwardStrategy.prototype.engineIteration = function(){ 
    console.log("BackwardStrategy run");
    console.log('Current hypothesis',this.hypothesis)
    var canProve = this.canProveHypothesis()
    if (canProve) {
        console.log('The current Knowledge base CAN prove the hypothesis\n')
        return true
    }else{
        console.log('The current Knowledge base CAN\'T prove the hypothesis\n')
    }
    for (var rule of Object.values(this.ruleSet.getRules())){
        // If the rule has the consequence of the hypothesis
        console.log('Evaluating rule',rule.name, rule.conditionObject,rule.consecuence);


        if (rule.hasConsequence(this.hypothesis)) {
            this.hypothesis = rule.conditionObject;
            // # Repeat for the condition of the rule
            console.log('Current rule has relevant consequence\n')
            var result = this.engineIteration()
            if (result) {
                return true
            }
        } else {
            console.log('Current rule has not relevant consequence\n')
        }
    }
    return false
}

BackwardStrategy.prototype.run = function(){ 
    console.log('STARTING backward chaining algorithm')
    console.log('Initial Knowledge: ',this.knowledgeBase.getKnowledgeBase())
    console.log('this.hypothesis',this.hypothesis);
    var result = this.engineIteration();
    console.log('Backward chaining algorithm finish with result ',result)
    return result;

} 

module.exports = BackwardStrategy;
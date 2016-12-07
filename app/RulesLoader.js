"use strict";
var fs = require('fs');

var RulesLoader = function () {
	
	this.data = null;
    this.initialKnowledgeBase = null;  
    this.hypothesis = null;  
}

function loadFile(file_path) {
    var contents = fs.readFileSync(file_path).toString();
    return JSON.parse(contents);
}

RulesLoader.prototype.loadRules = function(file_path){
    this.data = loadFile(file_path);

}

RulesLoader.prototype.loadKnowledgeBase = function(file_path){
    this.initialKnowledgeBase = loadFile(file_path);
} 

RulesLoader.prototype.loadHypothesis = function(file_path){
    this.hypothesis = loadFile(file_path);
} 

RulesLoader.prototype.getRules = function(){
    return this.data.rules;
}

RulesLoader.prototype.getInitialKnowledgeBase = function(){
    return this.initialKnowledgeBase;
}

RulesLoader.prototype.getHypothesis = function(){
    return this.hypothesis;
}


RulesLoader.prototype.saveKnowledgeBase = function(filename, data){
    var knowledges = JSON.stringify(data.knowledges, null, "\t");
    fs.writeFile(filename, knowledges, 'utf8')
}


module.exports = RulesLoader;
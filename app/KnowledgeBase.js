"use strict";

function KnowledgeBase() {
	this.knowledges = [];
}

//TODO: REVISAR
KnowledgeBase.prototype.addKnowledge = function(newKnowledge) {
    for (var knowledge of this.knowledges) {
        if (knowledge == newKnowledge) {
            return;
        }
    }
    this.knowledges.push(newKnowledge);
}

KnowledgeBase.prototype.getKnowledgeBase = function() {
	return this.knowledges;
}


module.exports = KnowledgeBase;
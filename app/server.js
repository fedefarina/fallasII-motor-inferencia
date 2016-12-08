"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const RulesLoader = require('./RulesLoader');
const RulesManager = require('./RulesManager');
const rulesManager = new RulesManager();

app.use(bodyParser.json());

//Execute engine using forward strategy
app.get('/forward-strategy', function (req, res) {
  rulesManager.setInferenceStrategy("f")
  rulesManager.run();
  return res.status(200).send(rulesManager.getKnowledgeBase())
});

//Execute engine using backward strategy
app.get('/backward-strategy', function (req, res) {
  rulesManager.setInferenceStrategy("b")
  return res.status(200).send(rulesManager.run())
});

app.get('/rules', function (req, res) {
  res.status(200).send(rulesManager.getRuleSet());
});

app.post('/rules', function (req, res) {
  let rules = req.body
  rulesManager.setRules(rules)
  res.status(200).send()
});

app.get('/knowledgeBase', function (req, res) {
  res.status(200).send(rulesManager.getKnowledgeBase())
});

app.post('/knowledgeBase', function (req, res) {
  console.log(req.body);
  let knowledgeBase = req.body;
  rulesManager.setKnowledgeBase(knowledgeBase)
  res.status(200).send();
});

app.get('/hypothesis', function (req, res) {
  console.log('GET - hypothesis');
  res.status(200).send(rulesManager.getHypothesis())
});

app.post('/hypothesis', function (req, res) {
  console.log(req.body);
  let hypothesis = req.body;
  rulesManager.setHypothesis(hypothesis)
  res.status(200).send();
});

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});

const http = require('http');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/cpuinfo', function(req, res) {
  var child = exec('luajit procinfo.lua cpuinfo > cpuinfo.json');
  var file = fs.readFileSync(path.join(__dirname+'/cpuinfo.json'), 'utf8');
  
  res.setHeader( 'Content-Type', 'application/json');
  res.send(JSON.stringify(file));
});

app.get('/memfree', function(req, res) {
  var child = exec('luajit memfree.lua > memfree.json');
  var file = fs.readFileSync(path.join(__dirname+'/memfree.json'), 'utf8');
  
  res.setHeader( 'Content-Type', 'application/json');
  res.send(JSON.stringify(file));
});

app.listen(8080);
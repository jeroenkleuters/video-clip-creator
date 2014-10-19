var tplMain = require('../views/template-main');
var tplCreate = require('../views/template-create');
var doT = require('dot');

exports.get = function(req, res) {

//var http = require('http'),
//    util = require('util'),
//    fs = require('fs');

    //strSongtext = "<div class='songtext'>" + strSonglines + "</div>"
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write( template.build( songData.title, songData.title, strSongtext ) );


    //var fs    = require('fs'),
    //    path  = require('path');
    //
    //var mkdirSync = function (path) {
    //  try {
    //    fs.mkdirSync(path);
    //  } catch(e) {
    //    if ( e.code != 'EEXIST' ) throw e;
    //  }
    //}
  //tplCreate.build();
  //
  res.writeHead(200, {'Content-Type': 'text/html'});
  ////res.write( tplMain.build('visite', 'create', tplCreate));
  ////res.end();
  //fs.readFile('../views/form.html',function(error,data){
  //  res.end(data);
  //});
  var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");
  var resultText = tempFn({foo: 'with doT'});
  res.end(resultText);

};

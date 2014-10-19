var tplMain = require('../views/template-main');
var tplEditor = require('../views/template-edit');
//svar songtext_data = require('../model/visite-data');

exports.get = function(req, res) {

 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write( tplMain.build('visite', 'edit', tplEditor));
 res.end();
}

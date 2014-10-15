var template = require('../views/template-create');

exports.get = function(req, res) {


    strSongtext = "<div class='songtext'>" + strSonglines + "</div>"
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write( template.build( songData.title, songData.title, strSongtext ) );
    res.end();
};

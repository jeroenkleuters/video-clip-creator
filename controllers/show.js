var template = require('../views/template-main');
var songtext_data = require('../model/visite-data');

exports.get = function(req, res) {
    var songData = songtext_data.song,
        strSongtext = "",
        strSonglines = "",
        i = 0;


    //strSongtext = strSongtext + songData.title + "<br>";
    //strSongtext = strSongtext + songData.artist + "<br>";
    //strSongtext = strSongtext + songData.lines[0].line + " t=";
    //strSongtext = strSongtext + songData.lines[0].starttime + "<br>";


for(var line in songData.songtext){
    strSonglines = strSonglines + "<p data.time='" + songData.songtext[i].starttime + "'>" + songData.songtext[i].line + "</p>";
    i++;
}


    strSongtext = "<div class='songtext'>" + strSonglines + "</div>"
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(
    template.build(songData.title, songData.title, strSongtext));
    res.end();
}

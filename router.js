var url = require('url');
var fs = require('fs');

exports.get = function(req, res) {
    req.requrl = url.parse(req.url, true);
    var path = req.requrl.pathname;

    if (/.(css)$/.test(path)){
        res.writeHead(200, {'Content-Type': 'text/css'});
        fs.readFile(__dirname + path, 'utf8', function (err, data){
            if (err) throw err;
            res.write(data, 'utf8');
            res.end();
        });
    } else {
        switch (path) {
            case '/':
                require('./controllers/show').get(req, res);
                break;

            case '/home':
                require('./controllers/show').get(req, res);
                break;

            case '/edit':
                require('./controllers/edit').get(req, res);
                break;

            case '/create':
                require('./controllers/create').get(req, res);
                break;

            default:
                require('./controllers/404').get(req, res);
        }
    }
}

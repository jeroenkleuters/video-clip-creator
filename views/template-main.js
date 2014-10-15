exports.build = function(title, pagetitle, content) {
 return ['<!doctype html>',
 '<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>{title}</title>',
 '<link rel="stylesheet" href="assets/css/main.css" />\n</head>',
 '<body><h1>{pagetitle}</h1>',
 '<div id="content">{content}</div>\n</body>\n</html>'
 ].join('\n')
 .replace(/{title}/g, title)
 .replace(/{pagetitle}/g, pagetitle)
 .replace(/{content}/g, content);
}

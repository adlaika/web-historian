var http = require("http");
var handler = require("./request-handler.js");
var initialize = require("./initialize.js");
var urlParser = require("url");
var archive = require("../helpers/archive-helpers.js");
// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
initialize();

var routes = {
  '/': function(req, res) {
    var url = archive.paths.siteAssets+'/index.html';
    console.log('url', url)
    handler.handleRequest(req, res, url)
  },
  '/styles.css': function(req, res) {
    var url = archive.paths.siteAssets+'/index.html';
    console.log('url', url)
    handler.handleRequest(req, res, url)
  }
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
  console.log("Listening on http://" + ip + ":" + port);
  // var parts = urlParser.parse(req.url);
  if(!!req.url) {
    handler.handleRequest(req, res);
  }
});

// var server = http.createServer(function(req, res) {
//   console.log("Listening on http://" + ip + ":" + port);
//   var parts = urlParser.parse(req.url);
//   // console.log("-------PARTS.PATHNAME--------: " + parts.pathname);
//   var filePath = parts.pathname;

//   var route = routes[filePath];
//   if ( route ){
//     route(req, res);
//   } else {
    // archive.callbackIfURLArchived(filePath, function(fileExists) {
    //   if(fileExists) {
    //     var url = archive.paths.archivedSites+filePath;
    //     handler.handleRequest(req, res, url)
    //   }
    // });
//     //404 not found
//   }
// });
server.listen(port, ip);

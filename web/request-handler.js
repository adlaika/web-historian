var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')

// require more modules/folders here!

var sendData = function(code, headers, res, data) {
  data = data || '';
  res.writeHead(code, headers);
  res.write(data);
  res.end();
}
var asset;
var actions = {
  'GET': function(req, res) {
    console.log('req.url-------------------',req.url)
    if (req.url === '/' || req.url==='/styles.css' || req.url==='/favicon.ico') {

      asset = archive.paths.siteAssets + '/index.html';
      helpers.serveAssets(res, asset, sendData);
    } else {
      asset = archive.paths.archivedSites + req.url;
      archive.callbackIfURLArchived(asset, function(fileExists) {
        if (fileExists) {
          helpers.serveAssets(res, asset, sendData);
        } else {
          sendData(404, helpers.headers, res);
        }
      })
    };
    // helpers.serveAssets(res, url, sendData);
  }
}
exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  }
   // res.end(archive.paths.list);
};

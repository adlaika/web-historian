var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')
var qs = require('querystring');

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
      });
    };
    // helpers.serveAssets(res, url, sendData);
  },
  'POST': function(req, res) {
    var body = '';
    req.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function () {
      var post = qs.parse(body).url;
      asset = archive.paths.archivedSites + '/'+post;

      archive.callbackIfURLArchived(asset, function(fileExists) {
        if (fileExists) {
          helpers.serveAssets(res, asset, sendData);
        } else {
          //serve loading.html and write to sites.txt
          asset = archive.paths.siteAssets + '/loading.html';
          helpers.serveAssets(res, asset, sendData);
          archive.addUrlToList(post);
        }
      });
      // sendData(201, helpers.headers, res);
    });
  }
}
exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  }
   // res.end(archive.paths.list);
};

var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')

// require more modules/folders here!

var sendData = function(code, headers, data, res) {
  res.writeHead(code, headers);
  res.write(data);
}

var actions = {
  'GET': function(req, res) {
    helpers.serveAssets(res, archive.paths.siteAssets + '/index.html', sendData);
  }
}
exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if (action) {
    action(req, res);
  }
   // res.end(archive.paths.list);
};

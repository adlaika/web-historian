var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')

// require more modules/folders here!

var sendData = function(code, headers, data, res) {
  res.writeHead(code, headers);
  res.write(data);
}

var actions = {
  'GET': function(req, res, url) {
    helpers.serveAssets(res, url, sendData);
  }
}
exports.handleRequest = function (req, res, url) {
  console.log('inhandlerequest', url);
  // url = url || undefined;
  var action = actions[req.method];
  if (action) {
    action(req, res, url);
  }
   // res.end(archive.paths.list);
};

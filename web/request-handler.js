var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      //'/Users/HR10/2015-05-web-historian/web/public/index.html' is absolute dir
      helpers.serveAssets(res, './web/public/index.html');
    }
  }
  // res.end(archive.paths.list);
};

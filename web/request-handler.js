var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var helpers = require('./http-helpers.js')

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    helpers.serveAssets(res, '/Users/HR10/2015-05-web-historian/web/public/index.html')
    // if (req.url === '/') {
      // res.writeHead(200, headers);
    // }
  }
  // res.end(archive.paths.list);
};

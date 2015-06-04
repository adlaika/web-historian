var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http-request");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  fs.readFile(paths.list, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    var urls = data.split(';');
    exports.downloadUrls(urls);
  });
};

// exports.isUrlInList = function(data, url){
//   var callback = function(data) {
//     var urls = data.split(';');
//     return _.contains(urls, url);
//   }
//   readListOfUrls(callback);
// };

exports.addUrlToList = function(url){
  fs.appendFile(paths.list, url + ";", function(err){
    console.log('error on file append!');
  })
};

exports.callbackIfURLArchived = function(asset, callback){
  fs.exists(asset, callback);
};

exports.downloadUrls = function(array){
  array.forEach(function (url) {
    http.get(url, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      var html = res.buffer.toString();
      fs.writeFile(paths.archivedSites + '/' + url, html, function(err) {
        if (err){
          console.error(err);
          return;
        }
        console.log('file written!')
      });
      // console.log(res.code, res.headers, res.buffer.toString());
    });
  });
  //clear 'sites.txt' after pulling sites
  fs.writeFile(paths.list, '', function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('sites wiped!')
  })
};

var test = require('tape');
var path = require('path');

var dir = __dirname.split('/')[__dirname.split('/').length - 1];
var file = dir + __filename.replace(__dirname, '') + ' ->';

var start = require('../lib/start.js');
var server = require('../lib/index.js');

test(file + " GET /about-page returns status 200", function(t) {
  var options = {
    method: "GET",
    url: "/about-page"
  };
  server.inject(options, function(res) {
    t.equal(res.statusCode, 200, 'server loads ok');

    setTimeout(function() {
      server.stop(t.end);
    }, 700);

  });
});

test(file + " GET /about-page returns body", function(t) {
  var options = {
    method: "GET",
    url: "/about-page"
  };

  server.inject(options, function(res) {
    console.log("res.payload.indexOf", res.payload.indexOf('<h1 id="thisistheaboutpage">This is the About page</h1>'));


    t.equal(res.payload.indexOf('<h1 id="thisistheaboutpage">This is the About page</h1>'), 102 , 'server loads ok');

    setTimeout(function() {
      server.stop(t.end);
    }, 700);

  });
});


test(file + " GET /55 returns status 404", function(t) {
  var options = {
    method: "GET",
    url: "/55"
  };
  server.inject(options, function(res) {
    t.equal(res.statusCode, 404, 'server loads ok');

    setTimeout(function() {
      server.stop(t.end);
    }, 700);

  });
});

var test = require('tape');
var path = require('path');

var dir = __dirname.split('/')[__dirname.split('/').length - 1];
var file = dir + __filename.replace(__dirname, '') + ' ->';

var start = require('../lib/start.js');
var server = require('../lib/index.js');

//one that verifies that requests to valid URLs return a 200 HTTP status code
test(file + " GET /about-page returns status 200", function(t) {

  var endpointArray = ["about-page", "jobs", "valves"];
  var counter = 0;
  var finishTestCount = endpointArray.length;

  function incrementCounter() {
    counter++;
  };

  endpointArray.forEach(function(elem, i) {
    var options = {
      method: "GET",
      url: "/" + elem
    };

    server.inject(options, function(res) {
      t.equal(res.statusCode, 200, 'server loads ok');

      setTimeout(function() {
        incrementCounter();
        if (counter === finishTestCount) {
          server.stop(t.end);
        }
      }, 700);

    });
  })


});

//one that verifies that requests to valid URLS return a body that contains the HTML generated from the relevant `index.md` markdown file
test(file + " GET /about-page returns body", function(t) {

  var endpointHTMLArray = [
    ['about-page', '<h1 id="thisistheaboutpage">This is the About page</h1>'],
    ['jobs', '<h1 id="jobsatacmeco">Jobs at Acme Co.</h1>'],
    ['valves', '<h1 id="valves">Valves</h1>']
  ];
  var counter = 0;
  var finishTestCount = endpointHTMLArray.length;

  function incrementCounter() {
    counter++;
  };

  endpointHTMLArray.forEach(function(elem, i) {
    var options = {
      method: "GET",
      url: "/" + elem[0]
    };

    server.inject(options, function(res) {

      var indexHTMLcontent = (res.payload.indexOf(elem[1]) > -1) && (res.payload.indexOf("<body>") > -1);

      t.equal(indexHTMLcontent, true, 'server loads ok');

      setTimeout(function() {
        incrementCounter();
        if (counter === finishTestCount) {
          server.stop(t.end);
        }
      }, 700);

    });

  })

});

//one that verifies that requests to URLs that do not match content folders return a 404 HTTP status code
test(file + " GET /other returns status 404", function(t) {
  var options = {
    method: "GET",
    url: "/other"
  };
  server.inject(options, function(res) {
    t.equal(res.statusCode, 404, 'server loads ok');

    setTimeout(function() {
      server.stop(t.end);
    }, 700);

  });
});

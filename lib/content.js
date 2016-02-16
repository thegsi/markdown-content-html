var fs = require('fs');
var path = require('path');
var showdown = require('showdown');

exports.register = function(server, options, next) {

  server.route([{
    method: 'GET',
    path: '/{markdownFileName}',
    config: {
      description: 'return the  page',
      handler: function(request, reply) {
        console.log('in content.js');
        var markdownDirectoryName = request.params.markdownFileName;

        //check if markdownDirectoryName matches a content directory
        var srcpath = path.resolve('./content');

        //read content directory for directory names
        fs.readdir(srcpath, function(err, directories) {
          if (err) {
            console.log(err);
            return reply('File not Found').code(404);
          };

          //filter content for directory names
          directories.filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
          });

          //check if url is present in content
          var directoryIsPresent = directories.some(function(elem) {
            return elem === markdownDirectoryName;
          });

          //if markdownDirectoryName does not match a content directory reply with message and 404
          if (directoryIsPresent === false) {
            return reply('File not Found').code(404);
          };

          //create markdown path
          var markdownFilePath = path.resolve('./content/' + markdownDirectoryName + '/index.md');

          //read markdown path and convert to html
          fs.readFile(markdownFilePath, 'utf8', function(err, markdownData) {
            if (err) {
              console.log(err);
              return reply('File not Found').code(404);
            };

            var converter = new showdown.Converter();
            var htmlFromMarkdown = converter.makeHtml(markdownData);

            return reply.view('template', {
              content: htmlFromMarkdown
            });
          });

        });
      }
    }

  }]);

  return next();
};

exports.register.attributes = {
  name: 'Content'
};

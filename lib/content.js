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
        //TO DO error handle
        var directories = fs.readdirSync(srcpath).filter(function(file) {
          return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
        var directoryIsPresent = directories.some(function(elem) {
          return elem === markdownDirectoryName;
        });

        //if markdownDirectoryName does not match a content directory reply with message
        if (directoryIsPresent === false) {
          return reply('File not Found').code(404);
        };

        var markdownFilePath = path.resolve('./content/' + markdownDirectoryName + '/index.md');

        fs.readFile(markdownFilePath, 'utf8', function(error, markdownData) {
        
          var converter = new showdown.Converter();
          var htmlFromMarkdown = converter.makeHtml(markdownData);

          return reply.view('template', {
            content: htmlFromMarkdown
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

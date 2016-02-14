var fs = require('fs');
var path = require('path');

exports.register = function(server, options, next) {

  server.route([{
      method: 'GET',
      path: '/{markdownFileName}',
      config: {
        description: 'return the  page',
        handler: function(request, reply) {
          console.log('in content.js');
          var markdownDirectoryName = request.params.markdownFileName;
          console.log('markdownDirectoryName', markdownDirectoryName);
          var srcpath = path.resolve('./content');
          //error handle
          var directories = fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
          });
          console.log('directories', directories);

          var directoryIsPresent = directories.some(function(elem) {
            return elem  === markdownDirectoryName;
          });
          console.log('directoryIsPresent', directoryIsPresent);

          if (directoryIsPresent === false){
              return reply.view('template', {
                content: "This is not a valid directory name"
              });
          }

         fs.readfile

          return reply.view('template', {
                content: markdownExport
              }
            );
          }


        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Content'
};

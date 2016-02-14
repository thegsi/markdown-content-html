exports.register = function(server, options, next) {

  server.route([{
      method: 'GET',
      path: '/{markdownFileName}',
      config: {
        description: 'return the  page',
        handler: function(request, reply) {
          console.log('in content.js');
          var markdown = request.params.markdownFileName;
          console.log("markdown", markdown);

          return reply.view('markdown');
        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Content'
};

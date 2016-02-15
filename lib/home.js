exports.register = function(server, options, next) {

  server.route([{
      method: 'GET',
      path: '/',
      config: {
        description: 'return the home page',
        handler: function(request, reply) {
          console.log('in home.js');
          return reply('Index.js is working').code(404);
        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};

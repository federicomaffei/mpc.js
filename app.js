var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: { jade: require('jade') },
    path: __dirname + '/views'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
var Hapi = require('hapi'),
Path     = require('path'),
nodemon  = require('nodemon');

var server = new Hapi.Server();
server.connection({ port: 3000 });
server.views({
    engines: { 
    	jade: { 
    		module: require('jade'),
    		isCached: false
    	}
    },
    path: __dirname + '/views'
});

server.route({
    method: "GET",
    path: "/assets/{path*}",
    handler: {
        directory: {
            path: "./assets",
            listing: false,
            index: false
        }
    }
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
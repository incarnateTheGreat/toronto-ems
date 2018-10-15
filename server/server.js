'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: { cors: true }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
    path: '/api/getdata',
    method: 'GET',
    handler(req, reply) {
        return reply.file('../data/livecad.xml')
    }
});

server.register([require('vision'), require('inert')], (err) => {
    if (err) console.log(err);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
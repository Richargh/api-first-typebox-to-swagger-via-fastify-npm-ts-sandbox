import swagger from '@fastify/swagger';
import Fastify from 'fastify'
import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox'
import {ValidationFailedSchema} from './shared-schemas';
import {userRoutes} from './user-routes';

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

console.info('Registering Swagger');
server.register(swagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    openapi: {
        info: {
            title: 'Hypermedia API',
            version: '1.0.0'
        },
    }
});

console.info('Registering shared schemas');

server.addSchema(ValidationFailedSchema);

server.register(userRoutes);

server.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

import { Static, Type } from '@sinclair/typebox';
import swagger from '@fastify/swagger';
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

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




export const UserQuerySchema = Type.Object({
    name: Type.Optional(Type.String()),
    mail: Type.Optional(Type.String({format: 'email'})),
}, {$id: 'UserQuerySchema'});
export type UserQueryDto = Static<typeof UserQuerySchema>;

export const UserSchema = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({ format: 'email' })),
}, {$id: 'UserSchema'});

export type UserDto = Static<typeof UserSchema>;

export const UserCollectionSchema = Type.Array(Type.Ref(UserSchema), {$id: 'UserCollectionSchema'});
export type UserCollectionDto = Static<typeof UserCollectionSchema>;

console.info('Registering global schemas');
export const ValidationFailedSchema = Type.Object({
    error: Type.String(),
    message: Type.String(),
    statusCode: Type.Number(),
}, {$id: 'ValidationFailedSchema'});
server.addSchema(ValidationFailedSchema);

server.register(async function (fastify) {
    console.info('Registering user schemas');
    fastify.addSchema(UserQuerySchema);
    fastify.addSchema(UserSchema);
    fastify.addSchema(UserCollectionSchema);

    console.info('Registering user routes');

    fastify.get<{ Querystring: UserQueryDto, Reply: UserCollectionDto }>(
        '/users',
        {
            schema: {
                querystring: Type.Ref(UserQuerySchema),
                response: {
                    200: Type.Ref(UserCollectionSchema),
                    400: Type.Ref(ValidationFailedSchema),
                },
            },
        },
        (request, reply) => {
            // The `name` and `mail` types are automatically inferred
            const { name, mail } = request.query;
            reply.status(200).send([{ name: name ?? 'Alex', mail: mail ?? 'non@example.org' }]);
        }
    );

    fastify.post<{ Body: UserDto, Reply: UserDto }>(
        '/users',
        {
            schema: {
                body: Type.Ref(UserSchema),
                response: {
                    200: Type.Ref(UserSchema),
                    400: Type.Ref(ValidationFailedSchema),
                },
            },
        },
        (request, reply) => {
            // The `name` and `mail` types are automatically inferred
            const { name, mail } = request.body;
            reply.status(200).send({ name, mail });
        }
    );
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

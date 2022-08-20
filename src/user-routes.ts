import {FastifyInstance} from "fastify";
import {Type} from "@sinclair/typebox";
import {ValidationFailedSchema} from "./shared-schemas";
import {
    UserCollectionDto,
    UserCollectionSchema,
    UserDto,
    UserQueryDto,
    UserQuerySchema,
    UserSchema
} from "./user-schemas";

export async function userRoutes(fastify: FastifyInstance) {
    console.info('Registering user schemas');
    fastify.addSchema(UserQuerySchema);
    fastify.addSchema(UserSchema);
    fastify.addSchema(UserCollectionSchema);

    console.info('Registering user routes');

    type QueryUsersTypes = { Querystring: UserQueryDto, Reply: UserCollectionDto };
    const queryUsersOpts = {
        schema: {
            querystring: Type.Ref(UserQuerySchema),
            response: {
                200: Type.Ref(UserCollectionSchema),
                400: Type.Ref(ValidationFailedSchema),
            },
        },
    };
    fastify.get<QueryUsersTypes>('/users', queryUsersOpts, (request, reply) => {
            // The `name` and `mail` types are automatically inferred
            const {name, mail} = request.query;
            reply.status(200).send([{name: name ?? 'Alex', mail: mail ?? 'non@example.org'}]);
        }
    );

    type CreateUserTypes = { Body: UserDto, Reply: UserDto };
    const createUserOpts = {
        schema: {
            body: Type.Ref(UserSchema),
            response: {
                200: Type.Ref(UserSchema),
                400: Type.Ref(ValidationFailedSchema),
            },
        },
    };
    fastify.post<CreateUserTypes>('/users', createUserOpts,(request, reply) => {
            // The `name` and `mail` types are automatically inferred
            const {name, mail} = request.body;
            reply.status(200).send({name, mail});
        }
    );
}
import {Static, Type} from "@sinclair/typebox";

export const UserQuerySchema = Type.Object({
    name: Type.Optional(Type.String()),
    mail: Type.Optional(Type.String({format: 'email'})),
}, {$id: 'UserQuerySchema'});
export type UserQueryDto = Static<typeof UserQuerySchema>;

export const UserSchema = Type.Object({
    name: Type.String(),
    mail: Type.Optional(Type.String({format: 'email'})),
}, {$id: 'UserSchema'});

export type UserDto = Static<typeof UserSchema>;

export const UserCollectionSchema = Type.Array(Type.Ref(UserSchema), {$id: 'UserCollectionSchema'});
export type UserCollectionDto = Static<typeof UserCollectionSchema>;
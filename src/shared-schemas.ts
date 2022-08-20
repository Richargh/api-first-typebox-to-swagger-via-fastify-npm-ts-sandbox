import {Type} from "@sinclair/typebox";

export const ValidationFailedSchema = Type.Object({
    error: Type.String(),
    message: Type.String(),
    statusCode: Type.Number(),
}, {$id: 'ValidationFailedSchema'});
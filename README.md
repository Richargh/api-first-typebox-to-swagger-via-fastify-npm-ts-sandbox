# API First going from Typebox to Swagger with Fastify (Sandbox)

## Features

* Fastify + Typebox + TypeScript
* **Generated Swagger** Schema based on registered routes and Typebox schemas
* Swagger UI

## Usage

* `npm run start` and then, via [httpie](https://httpie.io/) or cURL:
    * GET all users `http localhost:8080/users?name=Taylor`
    * CREATE new user `http POST localhost:8080/users name=Alex`
    * Check the generate Schema: `http GET http://localhost:8080/docs/json`
    * View the [Swagger UI](http://localhost:8080/docs/) 

## Created via

* `npm init -y`
* `npm i fastify`
* `npm i -D typescript @types/node ts-node`
* `npx tsc --init` and configure `outdir: "dist"`, `"target": "es2017"` and other smaller things.
* `mkdir src && touch src/index.ts` and put code from [fastify swagger](https://github.com/fastify/fastify-swagger/blob/master/examples/dynamic-swagger.js).
* Add `"build": "tsc"` and `"start": "ts-node src/server.ts"` to [package.json](package.json).
* `npm i @sinclair/typebox @fastify/type-provider-typebox @fastify/swagger` and add /users with schema to [src/index.ts](src/index.ts) according to the [official docs](https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox)

## References

* https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
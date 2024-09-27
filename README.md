# REST API Example

Stack:

- NestJS
- PostgreSQL
- Prisma ORM

All the necessary configuration is listed in `.env.example` and must be translated to `.env` with empty fields filled with proper values in order to setup the server.

To setup the database:
```sh
npx prisma migrate dev
```.

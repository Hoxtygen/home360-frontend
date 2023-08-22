## Getting Started

## Scripts

`postgres:migrate:dev`: this would be used to create and execute migrations on our postgres database.

`postgres:migrate:dev:create`: this would create a postgres migration file which you can edit before executing.

`prisma`: this is the prisma cli so we can run commands straight from prisma-cli.

`postgres:migrate:deploy`: this applies pending migrations to staging, testing, or production environments to your postgres database.

`prisma:postgres:dbpush`: this syncs the prisma/postgres/shema.prisma with the postgres database.

`prisma:mongo:dbpush`: this syncs the prisma/mongo/shema.prisma with the mongo database.

`prisma:generate:mongo_client`: this would generate the prima client for mongo.

`prisma:generate:postgres_client`: this would generate the prisma client for postgres.

`prisma:generate:db_clients`: this would generate the prisma client for postgres and mongo.

`prisma:postgres:seed`: this would seed the postgres database

<!-- https://github.com/jquense/yup/issues/312#issuecomment-442854307 -->
<!-- https://github.com/jquense/yup/issues/1183 -->

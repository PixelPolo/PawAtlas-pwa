import { DATA_SOURCE } from 'src/common/constants';
import { DataSource } from 'typeorm';

const databaseUrl = process.env.DATABASE_URL;
let databaseConfig: any;

if (databaseUrl === undefined) {
  databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '...',
    password: '...',
    database: 'pawatlas',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../**/*.migration{.ts,.js}'],
    synchronize: true,
  };
} else {
  databaseConfig = {
    type: 'postgres',
    url: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../**/*.migration{.ts,.js}'],
    synchronize: false,
  };
}

export const dataSource = new DataSource(databaseConfig);
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

/*
CREATE THE DATABASE SCHEMA
npx typeorm schema:sync -d dist/common/database/database.provider.js

EXPORT A FILE WITH SQL COMMANDS TO CREATE THE DATABASE SCHEMA
npx typeorm schema:log -d dist/common/database/database.provider.js > schema.sql

CREATE A MIGRATION FILE
npx typeorm migration:generate -d dist/common/database/database.provider.js pawatlas

RUN THE MIGRATION FILE
npx typeorm migration:run -d dist/common/database/database.provider.js
*/

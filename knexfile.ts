import path from 'path';
import { Knex } from 'knex';

const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Since we use an environment parameter to switch the database and other connection data
 * We will only use one *dynamic* Knex environment for development and production
 *
 * @var Knex.Config
 */
const configuration: Knex.Config = {
  client: 'pg',
  connection: process.env.POSTGRESQL_DATABASE_URL || {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  debug: !!process.env.POSTGRESQL_DEBUG || false,
  migrations: {
    tableName: 'knex_migrations',
    directory: path.normalize('knex/migrations'),
    extension: 'ts',
    loadExtensions: ['.ts']
  },
  seeds: {
    directory: path.join('knex/seeds', NODE_ENV),
    extension: 'ts',
    loadExtensions: ['.ts']
  }
};

/**
 * To run integration tests, we will need to purge the database, then run specific migrations and seeders
 * This special environment is a safeguard to ensure tests run in a separate database
 */
export const integrationTestsConfiguration: Knex.Config = {
  client: 'pg',
  connection: process.env.TEST_POSTGRESQL_DATABASE_URL,
  debug: !!process.env.POSTGRESQL_DEBUG || false,
  migrations: {
    tableName: 'knex_migrations',
    directory: path.normalize('knex/migrations'),
    extension: 'ts',
    loadExtensions: ['.ts']
  },
  seeds: {
    // This could be a different one with specific seeders for specific scenarios we want to assert
    // but just to keep things simple we will reuse the same seeders here
    // directory: path.join('knex/seeds/test'),
    directory: path.join('knex/seeds/development'),
    extension: 'ts',
    loadExtensions: ['.ts']
  }
};

export default {
  [NODE_ENV]: configuration,
  test: integrationTestsConfiguration,
};

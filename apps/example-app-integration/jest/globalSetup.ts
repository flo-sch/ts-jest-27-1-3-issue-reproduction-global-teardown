/* eslint-disable @typescript-eslint/no-var-requires */
process.env.TS_NODE_PROJECT =
  process.env.TS_NODE_PROJECT || 'tsconfig.base.json';

/**
 * It seems like jest globalSetup and globalTeardown files are not transpiled at the moment
 * ts-node will ensure TS migrations and seeders can be run from within our test environment
 * @see https://github.com/facebook/jest/issues/5164
 */
require('ts-node').register();

require('dotenv').config();

import { knex } from 'knex';

import { integrationTestsConfiguration } from '../../../knexfile';

async function setup(): Promise<void> {
  try {
    global.knex = knex(integrationTestsConfiguration);
    await global.knex.migrate.latest();
    await global.knex.seed.run();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default setup;

import { Knex } from 'knex';

declare global {
  // eslint-disable-next-line no-var
  var knex: Knex;
}

async function teardown(): Promise<void> {
  try {
    // Rollback all migrations (purge Database)
    await global.knex.migrate.rollback();
    await global.knex.destroy();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default teardown;

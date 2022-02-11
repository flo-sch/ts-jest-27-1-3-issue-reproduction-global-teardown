import { Knex } from "knex";
import { TASKS_TABLE_NAME } from "@example/database";

export async function up(knex: Knex): Promise<void> {
  /**
   * Install the "uuid-ossp" extension to generate UUIDs
   * @note this is compatible with Cloud SQL
   * @see https://cloud.google.com/sql/docs/postgres/extensions
   */
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  /**
   * insert tables with initial columns
   */
  const isTasksTableCreated = await knex.schema.hasTable(TASKS_TABLE_NAME);
  if (!isTasksTableCreated) {
    await knex.schema.createTable(TASKS_TABLE_NAME, (table) => {
      table.uuid('id').notNullable().primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable().unique();
    });
  }

}


export async function down(knex: Knex): Promise<void> {
  /**
   * delete all created tables
   */
  await knex.schema.dropTableIfExists(TASKS_TABLE_NAME);

  // Remove extensions: disable in case other tables use it in the same server (locally mainly)
  // await knex.raw('DROP EXTENSION "uuid-ossp"');
}


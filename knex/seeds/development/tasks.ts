import { Knex } from "knex";
import { TASKS_TABLE_NAME } from "@example/database";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TASKS_TABLE_NAME).del();

  // Inserts seed entries
  await knex(TASKS_TABLE_NAME).insert([
    { name: 'Task 1' },
    { name: 'Task 2' },
    { name: 'Task 3' },
    { name: 'Task 4' },
    { name: 'Task 5' },
  ]);
};

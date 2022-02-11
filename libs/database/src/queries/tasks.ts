import { Knex } from 'knex';

export const TASKS_TABLE_NAME = 'tasks';

/** Just an example entity */
export interface TaskEntity {
  id: string;
  name: string;
}

export interface QueryArguments {
  knex: Knex;
}

export async function findAllTasks({
  knex,
}: QueryArguments): Promise<TaskEntity[]> {
  return await knex.select('*').from<TaskEntity>(TASKS_TABLE_NAME);
}

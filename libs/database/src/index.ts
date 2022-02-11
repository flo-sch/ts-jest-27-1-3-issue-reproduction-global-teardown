import { knex, Knex } from 'knex';
import config from '../../../knexfile';

/**
 * @var Knex
 *
 * @see https://devhints.io/knex
 * @see https://knexjs.org/
 */
export const getKnexClient = (): Knex =>
  knex(config[process.env.NODE_ENV || 'development']);

export * from './queries';

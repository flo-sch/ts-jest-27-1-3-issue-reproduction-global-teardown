// Let the fun begin

import { FastifyInstance } from 'fastify';
import knex, { Knex } from 'knex';
import { integrationTestsConfiguration } from 'knexfile';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { buildApp } from '../../example-app/src/app/fastify';

let app: FastifyInstance = undefined;
let knexClient: Knex;

beforeAll(async () => {
  knexClient = knex(integrationTestsConfiguration);
  app = buildApp({
    knex: knexClient,
  });
});

afterAll(async () => {
  await app.close();
  await knexClient.destroy();
});

describe('Integration Tests', () => {
  describe('/ Tasks', () => {
    test('it returns a list of tasks', async () => {
      const reply = await app.inject({
        method: 'GET',
        url: '/tasks',
      });

      expect(reply.statusCode).toEqual(200);
      expect(JSON.parse(reply.body)).toMatchObject({
        tasks: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });
});

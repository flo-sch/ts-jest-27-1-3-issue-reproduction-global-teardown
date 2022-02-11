import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Knex } from 'knex';
import { findAllTasks } from '@example/database';

export function buildApp({ knex }: { knex: Knex }): FastifyInstance {
  const app = fastify({
    // Forward the incoming request IP and host
    trustProxy: true,
  });

  app.get(
    '/tasks',
    async (_request: FastifyRequest, response: FastifyReply) => {
      const tasks = await findAllTasks({
        knex,
      });

      response.status(200).send({
        tasks,
      });
    }
  );

  app.addHook('onClose', async () => {
    await knex.destroy();
  });

  return app;
}

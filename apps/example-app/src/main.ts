import { getKnexClient } from '@example/database';
import { buildApp } from './app/fastify';

async function launch({
  port,
  host,
}: {
  port: number;
  host: string;
}): Promise<void> {
  const knex = getKnexClient();
  const app = buildApp({
    knex,
  });

  app.listen(port, host, (error: Error, address: string) => {
    if (error) {
      console.error(error);
    } else {
      console.info(`🚀 Server ready at ${address}`);
    }
  });
}

launch({
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '8080', 10),
});

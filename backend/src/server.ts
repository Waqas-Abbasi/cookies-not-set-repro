import 'reflect-metadata';
import 'dotenv/config';

import http from 'http';

import { expressMiddleware } from '@apollo/server/express4';

import { ApolloServer } from '@apollo/server';
import express from 'express';

import bodyParser from 'body-parser';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import cors from 'cors';

import session from 'express-session';
import { buildSchema } from 'type-graphql';

import { UserResolver } from './user';

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
async function bootstrap() {

	const app = express();

	app.set('trust proxy', true);

	// Disable powered by so people do not know the technology powering the server
	app.disable('x-powered-by');

  app.use('/graphql', bodyParser.json());

  app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:7000',
        credentials: true
    })
);

app.set("trust proxy", true);

app.use(
  '/graphql',
  session({
      proxy: true,
      name: 'sessionID',
      cookie: {
          maxAge: SEVEN_DAYS as number,
          sameSite: 'none',
          secure: false,
          httpOnly: true
      },
      resave: false,
      secret: 'secret' as string,
      saveUninitialized: false,
  })
);

	const httpServer = http.createServer(app);

	const schema = await buildSchema({
		resolvers: [UserResolver],
		validate: false
	});

	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res })
    })
  );

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);

	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

bootstrap();

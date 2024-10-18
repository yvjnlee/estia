import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';

import installValidator from './swagger';

const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    
    // Only use express.static in development
    if (process.env.NODE_ENV !== 'production') {
      app.use(express.static(`${root}/public`));
    }
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()}${p ? ` on port: ${p}` : ''}`
      );

    installValidator(app, this.routes)
      .then(() => {
        if (process.env.NODE_ENV === 'production') {
          // For Vercel, we don't need to create a server or listen on a port
          welcome(0)();
        } else {
          // For development, create a server and listen on the specified port
          http.createServer(app).listen(port, welcome(port));
        }
      })
      .catch((e) => {
        l.error(e);
        process.exit(1);
      });

    return app;
  }
}

// Export the app for Vercel
export const vercelApp = app;

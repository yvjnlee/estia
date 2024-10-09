import { Application } from 'express';
import projectsRouter from './api/controllers/projects/router';
import usersRouter from './api/controllers/users/router';

export default function routes(app: Application): void {
  app.use('/api/v1/projects', projectsRouter);
  app.use('/api/v1/users', usersRouter);
}

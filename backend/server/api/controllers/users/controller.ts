import UsersService from '../../services/users.service';
import { Request, Response } from 'express';
import { RequestParams } from './types';
import { User } from '../../../../common/types';
export class Controller {
  // Create
  create(req: Request<unknown, unknown, User>, res: Response): void {
    // #swagger.tags = ['Users']
    const user: User = req.body;

    try {
      UsersService.create(user).then((r) => {
        res.status(201).location(`/api/v1/users/${r?.id}`).json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  // Read
  all(_: Request, res: Response): void {
    // #swagger.tags = ['Users']
    try {
      UsersService.all().then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  byId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Users']
    const id = req.params.id;

    try {
      UsersService.byId(id).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  byUsername(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Users']
    const username = req.params.username;

    try {
      UsersService.byUsername(username).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching user by username', error });
    }
  }

  // Update
  update(req: Request<RequestParams, unknown, Partial<User>>, res: Response): void {
    // #swagger.tags = ['Users']
    const id = req.params.id;
    const user = req.body; // Assuming you send the full User object

    try {
      UsersService.update(id, user).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  // Delete
  delete(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Users']
    const id = req.params.id;

    try {
      UsersService.delete(id).then((r) => {
        if (r) res.status(204).end();
        else res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

export default new Controller();

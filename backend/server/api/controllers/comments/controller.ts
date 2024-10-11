import CommentsService from '../../services/comments.service';
import { Request, Response } from 'express';
import { RequestParams } from './types';
import { Comment } from '../../../../common/types';

export class Controller {
  // Create
  create(req: Request<unknown, Comment>, res: Response): void {
    // #swagger.tags = ['Comments']
    const comment: Comment = req.body;

    try {
      CommentsService.create(comment).then((r) => {
        res.status(201).location(`/api/v1/comments/${r?.commentId}`).json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  }

  // Read
  all(_: Request, res: Response): void {
    // #swagger.tags = ['Comments']
    try {
      CommentsService.getAll().then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }

  // Fetch comments by project ID
  byProjectId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Comments']
    const projectId = req.params.projectId;

    try {
      CommentsService.getByProjectId(projectId).then((r) => {
        if (r && r.length > 0) {
          res.json(r);
        } else {
          res
            .status(404)
            .json({ message: 'No comments found for this project' });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching comments by project ID', error });
    }
  }

  byCommentId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Comments']
    const id = req.params.id;

    try {
      CommentsService.getByCommentId(id).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comment', error });
    }
  }

  // Update
  update(req: Request<RequestParams, Comment>, res: Response): void {
    // #swagger.tags = ['Comments']
    const id = req.params.id;
    const comment: Comment = req.body;

    try {
      CommentsService.update(id, comment).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating comment', error });
    }
  }

  // Delete
  delete(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Comments']
    const id = req.params.id;

    try {
      CommentsService.delete(id).then((r) => {
        if (r) res.status(204).end();
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error });
    }
  }
}

export default new Controller();

import CommentInteractionsService from '../../services/commentInteractions.service';
import { Request, Response } from 'express';
import { RequestParams } from './types';
import { CommentInteraction, CommentInteractionDB } from '../../../../common/types';

export class Controller {
  // Create
  create(req: Request<RequestParams, unknown, CommentInteractionDB>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Comment Interaction data.',
        required: true,
        schema: {
            comment_id: "",
            user_id: "",
            interaction: true
        }
    } */
    const commentInteraction = req.body;
    console.log(req.params)
    try {
      CommentInteractionsService.create(commentInteraction, commentInteraction.comment_id).then((r) => {
        res.status(201).location(`/api/v1/commentInteractions/`).json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  }

  // Read
  all(req: Request, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;

    try {
      CommentInteractionsService.getAll(commentId).then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  }


  get(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    try {
      CommentInteractionsService.getInteraction(commentId, userId).then((r) => {
        if (r) res.json(r);
        else res.status(404).json(null);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comment', error });
    }
  }

  // Update
  update(req: Request<RequestParams, unknown, Partial<CommentInteractionDB>>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Comment Interaction data.',
        required: true,
        schema: {
            interaction: true
        }
    } */
    const commentId = req.params.commentId;
    const userId = req.params.userId;
    const commentInteraction = req.body;

    try {
      CommentInteractionsService.update(commentInteraction, commentId, userId).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating comment', error });
    }
  }

  // Delete
  delete(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['CommentInteractions']
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Comment Interaction data.',
        required: true,
        schema: {
            comment_id: "",
            user_id: "",
            interaction: true
        }
    } */
    const commentId = req.params.commentId;
    const userId = req.params.userId;

    try {
      CommentInteractionsService.delete(commentId, userId).then((r) => {
        if (r) res.status(204).end();
        else res.status(404).json({ message: 'Comment not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error });
    }
  }
}

export default new Controller();
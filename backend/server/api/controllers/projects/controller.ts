import ProjectsService from '../../services/projects.service';
import { Request, Response } from 'express';
import { RequestParams } from './types';
import { Project } from '../../../../common/types';

export class Controller {
  // Create
  create(req: Request<unknown, unknown, Project>, res: Response): void {
    // #swagger.tags = ['Projects']
    const project: Project = req.body;

    try {
      ProjectsService.create(project).then((r) => {
        res.status(201).location(`/api/v1/projects/${r?.projectId}`).json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating project', error });
    }
  }

  // Read
  all(_: Request, res: Response): void {
    // #swagger.tags = ['Projects']
    try {
      ProjectsService.getAll().then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  }

  byId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const id = req.params.id;

    try {
      ProjectsService.getByProjectId(id).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Project not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching project', error });
    }
  }

  byName(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const name = req.params.name;

    try {
      ProjectsService.getByProjectName(name).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Project not found' });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching project by name', error });
    }
  }

  // Update
  update(req: Request<RequestParams, unknown, Partial<Project>>, res: Response): void {
    // #swagger.tags = ['Projects']
    const id = req.params.id;
    const project = req.body; // Assuming you send the full Project object

    try {
      ProjectsService.update(id, project).then((r) => {
        if (r) res.json(r);
        else res.status(404).json({ message: 'Project not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating project', error });
    }
  }

  // Delete
  delete(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const id = req.params.id;

    try {
      ProjectsService.delete(id).then((r) => {
        if (r) res.status(204).end();
        else res.status(404).json({ message: 'Project not found' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting project', error });
    }
  }

  // New method to fetch projects by user ID
  byUserId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const userId = req.params.userId;

    try {
      ProjectsService.getByUserId(userId).then((r) => {
        if (r) res.json(r);
        else {
          res.status(404).json({ message: 'No projects found for this user' });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching projects by user ID', error });
    }
  }

  bySavedUserId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const userId = req.params.userId;

    try {
      ProjectsService.getBySavedUserId(userId).then((r) => {
        if (r) res.json(r);
        else
          res.status(404).json({ message: 'No projects found for this user' });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching projects saved by user ID', error });
    }
  }

  byLikedUserId(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const userId = req.params.userId;

    try {
      ProjectsService.getByLikedUserId(userId).then((r) => {
        if (r) res.json(r);
        else
          res.status(404).json({ message: 'No projects found for this user' });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching projects liked by user ID', error });
    }
  }

  saveProject(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const projectId = req.params.projectId;
    const userId = req.params.userId;

    try {
      ProjectsService.saveProject(projectId, userId).then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving project', error });
    }
  }

  likeProject(req: Request<RequestParams>, res: Response): void {
    // #swagger.tags = ['Projects']
    const projectId = req.params.projectId;
    const userId = req.params.userId;

    try {
      ProjectsService.likeProject(projectId, userId).then((r) => {
        res.json(r);
      });
    } catch (error) {
      res.status(500).json({ message: 'Error liking project', error });
    }
  }
}

export default new Controller();

import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.all);
router.get('/id/:id', controller.byId);
router.get('/name/:name', controller.byName);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/user/:userId', controller.byUserId);
router.get('/saved/:userId', controller.bySavedUserId);
router.get('/liked/:userId', controller.byLikedUserId);
router.post('/save/:projectId/:userId', controller.saveProject);
router.post('/like/:projectId/:userId', controller.likeProject);

export default router;

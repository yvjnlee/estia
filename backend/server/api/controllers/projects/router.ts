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
export default router;

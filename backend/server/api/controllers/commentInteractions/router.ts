import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/', controller.create);
router.get('/comment/:commentId', controller.all);
router.get('/comment/:commentId/user/:userId', controller.get);
router.patch('/comment/:commentId/user/:userId', controller.update);
router.delete('/comment/:commentId/user/:userId', controller.delete);

export default router;
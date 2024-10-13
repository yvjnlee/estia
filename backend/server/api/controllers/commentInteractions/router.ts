import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/:commentId/:userId', controller.create);
router.get('/:commentId', controller.all);
router.get('/:commentId/:userId', controller.get);
router.patch('/:commentId/:userId', controller.update);
router.delete('/:commentId/:userId', controller.delete);

export default router;
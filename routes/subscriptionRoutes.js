import express from 'express';
import {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/', createSubscription);
router.get('/:userId', getSubscription);
router.put('/:userId', updateSubscription);
router.delete('/:userId', cancelSubscription);

export default router;

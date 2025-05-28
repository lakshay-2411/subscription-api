import express from 'express';
import { createPlan, getPlans } from '../controllers/planController.js';
const router = express.Router();

router.get('/', getPlans);
router.post('/createplan', createPlan);

export default router;

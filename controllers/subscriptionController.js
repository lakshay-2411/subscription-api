import Subscription from '../models/Subscription.js';
import Plan from '../models/Plan.js';
import { scheduleExpirationJob } from '../queues/scheduleExpiration.js';

export const createSubscription = async (req, res) => {
  const { userId, planId } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  const subscription = new Subscription({
    userId,
    planId,
    status: 'ACTIVE',
    endDate,
  });

  await subscription.save();
  await scheduleExpirationJob(subscription);
  res.status(201).json(subscription);
};

export const getSubscription = async (req, res) => {
  const { userId } = req.params;
  const subscription = await Subscription.findOne({ userId }).populate('planId');
  if (!subscription) return res.status(404).json({ message: 'Not found' });
  res.json(subscription);
};

export const updateSubscription = async (req, res) => {
  const { userId } = req.params;
  const { planId } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.duration);

  const subscription = await Subscription.findOneAndUpdate(
    { userId },
    { planId, endDate, status: 'ACTIVE' },
    { new: true }
  );
  if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
  await scheduleExpirationJob(subscription);

  res.json(subscription);
};

export const cancelSubscription = async (req, res) => {
  const { userId } = req.params;
  const subscription = await Subscription.findOneAndUpdate(
    { userId },
    { status: 'CANCELLED' },
    { new: true }
  );
  if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
  res.json(subscription);
};

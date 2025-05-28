// queues/subscriptionQueue.js
import { getRedisClient } from '../config/redis.js';
import Subscription from '../models/Subscription.js';

let redisClient;

const SUBSCRIPTION_QUEUE = 'subscription_expiry_queue';

// Function to push subscription to queue
export const queueSubscriptionCheck = async (subscriptionId) => {
  if (!redisClient) redisClient = await getRedisClient();
  try {
    await redisClient.lPush(SUBSCRIPTION_QUEUE, subscriptionId);
  } catch (err) {
    console.error('Redis queue push error:', err);
  }
};

// Worker to process expiration checks
const processQueue = async () => {
  redisClient = await getRedisClient();
  while (true) {
    try {
      const subscriptionId = await redisClient.rPop(SUBSCRIPTION_QUEUE);
      if (subscriptionId) {
        const sub = await Subscription.findById(subscriptionId);
        if (sub && sub.status === 'ACTIVE' && new Date() > new Date(sub.endDate)) {
          sub.status = 'EXPIRED';
          await sub.save();
          console.log(`Subscription ${sub._id} expired.`);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait if queue is empty
      }
    } catch (err) {
      console.error('Error processing queue:', err);
    }
  }
};

// Start the worker
processQueue();

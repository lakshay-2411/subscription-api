import { expirationQueue } from './expirationQueue.js';

export const scheduleExpirationJob = async (subscription) => {
  const delay = new Date(subscription.endDate).getTime() - Date.now();

  await expirationQueue.add(
    'expire-subscription',
    { subscriptionId: subscription._id.toString() },
    {
      delay,
      attempts: 3,         // retry 3 times
      backoff: {
        type: 'exponential',
        delay: 5000,       // initial retry delay
      },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};

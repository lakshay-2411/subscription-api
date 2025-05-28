import pkg from "bullmq";
const { Queue, Worker } = pkg;
import { connection } from "../config/redis.js";
import Subscription from "../models/Subscription.js";

export const expirationQueue = new Queue("subscription-expiration", {
  connection,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
  },
});

export const expirationWorker = new Worker(
  "subscription-expiration",
  async (job) => {
    const { subscriptionId } = job.data;
    const subscription = await Subscription.findById(subscriptionId);

    if (subscription && subscription.status === "ACTIVE") {
      if (new Date() > new Date(subscription.endDate)) {
        subscription.status = "EXPIRED";
        await subscription.save();
        console.log(`✅ Subscription ${subscriptionId} expired.`);
      }
    }
  },
  {
    connection,
    concurrency: 5,
  }
);

// Error handling
expirationWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

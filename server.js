import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { bullBoardAdapter } from "./utils/bullBoard.js";

dotenv.config();
const startServer = async () => {
  await connectDB();

  await import('./queues/expirationQueue.js');

  const app = express();
  app.use(express.json());

  app.use('/admin/queues', bullBoardAdapter.getRouter());
  app.use("/plans", planRoutes);
  app.use("/subscriptions", subscriptionRoutes);
  app.use("/auth", authRoutes);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

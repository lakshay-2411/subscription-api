import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { expirationQueue } from '../queues/expirationQueue.js';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new (await import('@bull-board/api/bullMQAdapter.js')).BullMQAdapter(expirationQueue)
  ],
  serverAdapter,
});

export { serverAdapter as bullBoardAdapter };

import { Worker } from "bullmq";
import redisConnection from "./redis-connection.js";
import { sendVerificationEmail } from "./services/mail-service.js";

export const myWorker = new Worker(
  "myqueue",
  async (job) => {
    try {
      console.log("### Consuming job", job.id, "with data", job.data);
      sendVerificationEmail([job.data.to]);
    } catch (err) {
      // Reject Promise on error
      throw err;
    }
  },
  {
    connection: redisConnection,
    autorun: false,
  }
);

myWorker.on("completed", (job, returnvalue) => {
  console.log(`Completed job ${job.id}`);
});

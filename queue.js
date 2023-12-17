import { Queue } from "bullmq";
import redisConnection from "./redis-connection.js";

export const myQueue = new Queue("myqueue", {
  connection: redisConnection,
});

myQueue.on("waiting", (job) => {
  console.log(job.id, `Job ${job.id} is in waiting`);
});

myQueue.on("completed", (job) => {
  console.log(`Job ${job.id} is completed!`);
});

myQueue.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with ${err}`);
});

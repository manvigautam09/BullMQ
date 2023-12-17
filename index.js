import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { myQueue } from "./queue.js";
import { myWorker } from "./worker.js";

dotenv.config();

async function addJob(email, customerName, productName, productImage) {
  await myQueue.add(
    "email",
    {
      to: email,
      customerName,
      productName,
      productImage,
    },
    { delay: 1000 * 1 * 1 * 10 } //1000 * hours * minutes * sec
  );
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
myWorker.run();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/trigger-email", async (req, res) => {
  const { email, customerName, productName, productImage } = req.body;
  console.log("### trigger-email", email);
  addJob(email, customerName, productName, productImage);
  res.send("trigger-email");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

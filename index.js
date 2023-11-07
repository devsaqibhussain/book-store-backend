import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotevn from "dotenv";

import { PORT } from "./config.js";
import router from "./routes/bookRoutes.js";

dotevn.config();
const app = express();
const db_URL = process.env.MONGODB_URL;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/book", router);

mongoose
  .connect(db_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error message:", err);
  });
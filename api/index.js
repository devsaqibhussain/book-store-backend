import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotevn from "dotenv";

import { PORT } from "../config.js";
import router from "../routes/bookRoutes.js";

dotevn.config();
const app = express();
const db_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors({}));

app.use("/api/book", router);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.send("This is a backend server for book-store");
});
mongoose
  .connect(db_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || PORT, () => {
      console.log(`App is listening on PORT: ${process.env.PORT || PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error message:", err);
  });

export default app;

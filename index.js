import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotevn from "dotenv";

import router from "./routes/bookRoutes.js";

dotevn.config();
const app = express();
const db_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("api/book", router);
app.get("/", (req, res) => {
  res.send("<h1>This is a backend server for book-store</h1>");
  res.end();
});
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

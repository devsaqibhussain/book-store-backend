import app from "../index.js";
import mongoose from "mongoose";
import * as dotevn from "dotenv";
dotevn.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 5555, () => {
      console.log(`App is listening on PORT: ${process.env.PORT || 5555}`);
    });
  })
  .catch((err) => {
    console.log("Error message:", err);
  });

export default app;

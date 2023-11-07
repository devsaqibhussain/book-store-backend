import app from "../index.js";
import mongoose from "mongoose";

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
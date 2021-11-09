import mongoose from "mongoose";
import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { newUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

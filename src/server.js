import mongoose from "mongoose";
import express from "express";
import cors from "cors"

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors())

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { newUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use('/login', (req,res)=>{
  res.send({
    token: 'test123'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

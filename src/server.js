import dotenv from 'dotenv'
import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import users from './routes/api/users.js'

dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors())

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));


// Routes
app.get('/', (req, res) => { res.send('Hello from Express!')})

app.use('/login', (req,res)=>{
  res.send({
    token: 'test123'
  })
})

app.use("/api/users", users)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

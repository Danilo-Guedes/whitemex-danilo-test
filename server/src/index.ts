import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const PORT = process.env.PORT || 3000; 


const app = express();


//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });


import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import user_Router from "./Routes/userRoutes.js";

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/user", user_Router);
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

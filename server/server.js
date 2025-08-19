import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000"}));
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));



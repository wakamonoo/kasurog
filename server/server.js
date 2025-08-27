import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import userGet from "./routes/userGet.js";
import carRoute from "./routes/carRoute.js";
import carGet from "./routes/carGet.js";
import imageRoute from "./routes/imageRoute.js";
import regRoute from "./routes/regRoute.js";
import regGet from "./routes/regGet.js";

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://arqila-wakamonoo.vercel.app",
];
const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/users", userGet);
app.use("/api/cars", carRoute);
app.use("/api/cars", carGet);
app.use("/api/register", regRoute);
app.use("/api/register", regGet);
app.use("/api/images", imageRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

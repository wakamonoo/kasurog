import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import userGet from "./routes/userGet.js";
import carRoute from "./routes/carRoute.js";
import carGet from "./routes/carGet.js";
import imageRoute from "./routes/imageRoute.js";

dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://arqila-wakamonoo.vercel.app",
];
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/users", userGet);
app.use("/api/cars", carRoute);
app.use("/api/cars", carGet);
app.use("/api/images", imageRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

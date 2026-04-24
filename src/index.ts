import express from "express";
import dotenv from "dotenv-safe";
import cors from 'cors';
import bookingRoutes from "./ports/rest/routes/booking";
import userRoutes from "./ports/rest/routes/user";
import dependencies from "./infrastructure/dependencies";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

dotenv.config();

const { mongoDbClient } = dependencies;
mongoDbClient.ConnectToDb()
  .catch(err => console.error('DB connection failed:', err));

app.use("/healthcheck", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/user", userRoutes);
app.use("/booking", bookingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

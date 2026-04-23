import express from "express";
import dotenv from "dotenv-safe";
import cors from 'cors';
import bookingRoutes from "./ports/rest/routes/booking";
import userRoutes from "./ports/rest/routes/user";
import dependencies from "./infrastructure/dependencies";

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(express.json());

dotenv.config(); //allows environment variables to be accessed.

const {mongoDbClient} = dependencies;
mongoDbClient.ConnectToDb();

// Health check
app.use("/healthcheck", (req, res, next) => {
  res.status(200).json({ message: "Successful" });
});

app.use("/user", userRoutes);
app.use("/booking", bookingRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

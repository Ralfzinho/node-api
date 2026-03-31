import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import buysellRoutes from "./routes/buysellRoutes.js";
import i18n from "./config/i18n.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(i18n.init);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/buysells", buysellRoutes);
export default app;

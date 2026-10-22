

import express from "express";
import authRoute from "./module/auth/auth.routes.js";
import teamRoute from "./module/team/team.routes.js"
import playerRoute from "./module/player/player.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "bana liya yahan bhi" });
});

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/teams",teamRoute);
app.use("/api/players", playerRoute);

export default app;
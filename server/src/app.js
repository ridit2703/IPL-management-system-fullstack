

import express from "express";
import authRoute from "./module/auth/auth.routes.js";
import teamRoute from "./module/team/team.routes.js"
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "bana liya yahan bhi" });
});

app.use("/api/auth", authRoute);
app.use("/api/teams",teamRoute)

export default app;
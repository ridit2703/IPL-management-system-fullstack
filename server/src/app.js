

import express from "express";
import authRoute from "./module/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "bana liya yahan bhi" });
});

app.use("/api/auth", authRoute);

export default app;
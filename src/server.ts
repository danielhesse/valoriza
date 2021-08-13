import "reflect-metadata";

import express from "express";
import { routes } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.port || 3333, () => {
  console.log("🚀 Server running on port 3333.");
});

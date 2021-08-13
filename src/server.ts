import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { routes } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

app.listen(process.env.port || 3333, () => {
  console.log("🚀 Server running on port 3333.");
});

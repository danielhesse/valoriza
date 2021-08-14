import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receive token
  const authToken = request.headers.authorization;

  // Check if token is filled
  if (!authToken) {
    return response.status(401).json({
      status: "error",
      message: "Token is missing!"
    });
  }

  const [, token] = authToken.split(" ");

  // Check if token is valid
  try {
    const { sub } = verify(token, "7c481ef735bf588a75710ead1d5248ee");

    request.user_id = sub as string;

    return next();
  } catch (error) {
    return response.status(401).json({
      status: "error",
      message: "Token is missing!"
    });
  }

  // Retrieve user information
}

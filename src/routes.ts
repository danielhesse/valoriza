import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

// Users
routes.post("/users", createUserController.handle);

// Tags
routes.post("/tags", ensureAdmin, createTagController.handle);

// Authentication
routes.post("/sessions", authenticateUserController.handle);

import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

// Users
routes.post("/users", createUserController.handle);

// Tags
routes.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

// Authentication
routes.post("/sessions", authenticateUserController.handle);

// Compliments
routes.post("/compliments", ensureAuthenticated, createComplimentController.handle);

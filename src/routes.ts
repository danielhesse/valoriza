import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const routes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();

// Users
routes.post("/users", createUserController.handle);
routes.get("/users", ensureAuthenticated, listUsersController.handle);

// Tags
routes.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
routes.get("/tags", ensureAuthenticated, listTagsController.handle);

// Authentication
routes.post("/sessions", authenticateUserController.handle);

// Compliments
routes.post("/compliments", ensureAuthenticated, createComplimentController.handle);
routes.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
routes.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);

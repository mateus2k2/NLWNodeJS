import { request, Router } from "express";
import { SettingsController } from "./constrollers/settingsController";
import { UsersController } from "./constrollers/usersController";
import { MessagesController } from "./constrollers/MessagesController";
 
const routes = Router();

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()


routes.post("/settings", settingsController.create)
routes.post("/settings/:username", settingsController.findByUsername)
routes.put("/settings/:username", settingsController.update)
routes.post("/users", usersController.create)
routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.showByUser)



export { routes };


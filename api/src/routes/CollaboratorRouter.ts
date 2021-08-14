import express from "express";
import collaboratorController from "../controller/CollaboratorController";

export const collaboratorRouter = express.Router();

collaboratorRouter.post("/registrar", collaboratorController.signup);
collaboratorRouter.get("", collaboratorController.getAll);
collaboratorRouter.get("/:id", collaboratorController.getById);
collaboratorRouter.put("/:id/:validate", collaboratorController.validateOrNot);

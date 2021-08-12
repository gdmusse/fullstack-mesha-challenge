import express from "express";
import collaboratorController from "../controller/CollaboratorController";

export const collaboratorRouter = express.Router();

collaboratorRouter.post("/registrar", collaboratorController.signup);

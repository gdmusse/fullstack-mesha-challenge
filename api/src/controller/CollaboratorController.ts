import { Request, Response } from "express";
import { CollaboratorInputDTO } from "../model/Collaborator";
import collaboratorBusiness from "../business/CollaboratorBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class CollaboratorController {
  async signup(req: Request, res: Response) {
    try {
      const input: CollaboratorInputDTO = {
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
        phone: req.body.phone || null,
        knowledges: req.body.knowledges,
      };

      await collaboratorBusiness.registerCollaborator(input);

      const message = "User registered successfully.";
      res.status(200).send({ message });
    } catch (error) {
        res.status(400).send({ error: error.message });
  
    }
  }
}

export default new CollaboratorController();

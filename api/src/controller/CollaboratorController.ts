import { Request, Response } from "express";
import { CollaboratorInputDTO } from "../model/Collaborator";
import collaboratorBusiness from "../business/CollaboratorBusiness";

export class CollaboratorController {
  async signup(req: Request, res: Response) {
    try {
      const input: CollaboratorInputDTO = {
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
        phone: req.body.phone || null,
        knowledge_1: req.body.knowledge_1,
        knowledge_2: req.body.knowledge_2,
        knowledge_3: req.body.knowledge_3,
      };

      await collaboratorBusiness.registerCollaborator(input);

      const message = "Colaborador registrado.";
      res.status(200).send({ message });
    } catch (error) {
      if (error.message.includes("for key 'mangarosa_collaborators.cpf'")) {
        res.status(409).send({ error: "Este CPF já está registrado" });
      } else {
        res.status(400).send({ error: error.message });
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const collaborators = await collaboratorBusiness.getAllCollaborators();
      res.status(200).send({ collaborators });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async validateOrNot(req: Request, res: Response) {
    try {
      const validate = req.params.validate;
      const id = req.params.id;
      let message: string;

      validate === "validate"
        ? (await collaboratorBusiness.validateCollaborator(id),
          (message = "Colaborador validado."))
        : (await collaboratorBusiness.unvalidateCollaborator(id),
          (message = "Colaborador não validado."));

      res.status(200).send({ message });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

export default new CollaboratorController();

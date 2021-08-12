import { Request, Response } from "express";
import { CollaboratorInputDTO } from "../model/Collaborator";
import collaboratorBusiness from "../business/CollaboratorBusiness";

export class CollaboratorController {
 public async register(req: Request, res: Response) {
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
      if (!error.statusCode) {
        error.statusCode = 400;
      } else {
        res.status(error.statusCode).send({ error: error.message });
      }
      /*       if (error.message.includes("for key 'nickname'")) {
        res.status(409).send({ error: "This nickname is already registered" });
      }
      if (error.message.includes("for key 'email'")) {
        res.status(409).send({ error: "This email is already registered" });
      } */
    }
  }
  /* 
  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      };

      const token = await userBusiness.getUserByEmailOrNickname(loginData);

      res.status(200).send({ token });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 400;
      }
      res.status(error.statusCode).send({ error: error.message });
    }
  } */
}

export default new CollaboratorController();

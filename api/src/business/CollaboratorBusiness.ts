import {
  CollaboratorInputDTO,
  CollaboratorOutputDTO,
} from "../model/Collaborator";
import collaboratorDatabase, {
  CollaboratorDatabase,
} from "../data/CollaboratorDatabase";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import hashManager, { HashManager } from "../services/HashManager";
import authenticator, { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import { Collaborator } from "../../backup/src/model/Collaborator";

export class CollaboratorBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private collaboratorDatabase: CollaboratorDatabase
  ) {}

  public async registerCollaborator(collaborator: CollaboratorInputDTO) {
    try {
      if (!collaborator.name || !collaborator.email || !collaborator.cpf) {
        throw new BaseError(422, "Missing input");
      }

      if (collaborator.email.indexOf("@") === -1) {
        throw new BaseError(422, "Invalid email");
      }

      if (collaborator.knowledges.length < 1) {
        throw new BaseError(422, "Input at least one knowledge");
      }

      const id = this.idGenerator.generate();

      const collaboratorOutput: CollaboratorOutputDTO = {
        id: id,
        name: collaborator.name,
        email: collaborator.email,
        cpf: collaborator.cpf,
        phone: collaborator.phone,
      };

      await this.collaboratorDatabase.registerCollaborator(
        collaboratorOutput,
        collaborator.knowledges
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new CollaboratorBusiness(idGenerator, collaboratorDatabase);

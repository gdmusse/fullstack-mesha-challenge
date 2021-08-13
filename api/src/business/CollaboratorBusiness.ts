import {
  CollaboratorInputDTO,
  CollaboratorOutputDTO,
  KnowledgesOutputDTO,
  stringToKnowledge,
} from "../model/Collaborator";
import collaboratorDatabase, {
  CollaboratorDatabase,
} from "../data/CollaboratorDatabase";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import { BaseError } from "../error/BaseError";

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

      if (
        !collaborator.knowledge_1 &&
        !collaborator.knowledge_2 &&
        !collaborator.knowledge_3
      ) {
        throw new BaseError(422, "Input at least 1 knowledge");
      }

      const id = this.idGenerator.generate();

      const collaboratorOutput: CollaboratorOutputDTO = {
        id: id,
        name: collaborator.name,
        email: collaborator.email,
        cpf: collaborator.cpf,
        phone: collaborator.phone,
      };

      stringToKnowledge(collaborator.knowledge_1);
      collaborator.knowledge_2 !== undefined
        ? stringToKnowledge(collaborator.knowledge_2)
        : null;
      collaborator.knowledge_3 !== undefined
        ? stringToKnowledge(collaborator.knowledge_3)
        : null;

      const knowledges: KnowledgesOutputDTO = {
        first: collaborator.knowledge_1,
        second: collaborator.knowledge_2,
        third: collaborator.knowledge_3,
      };

      await this.collaboratorDatabase.registerCollaborator(
        collaboratorOutput,
        knowledges
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllCollaborators() {
    try {
      return await this.collaboratorDatabase.getAllCollaborators();
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async validateCollaborator(id: string) {
    try {
      return await this.collaboratorDatabase.validateCollaborator(id);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async unvalidateCollaborator(id: string) {
    try {
      return await this.collaboratorDatabase.unvalidateCollaborator(id);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new CollaboratorBusiness(idGenerator, collaboratorDatabase);

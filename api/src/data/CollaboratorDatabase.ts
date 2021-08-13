import { BaseDatabase } from "./BaseDatabase";
import {
  Collaborator,
  CollaboratorOutputDTO,
  KnowledgesOutputDTO,
} from "../model/Collaborator";

export class CollaboratorDatabase extends BaseDatabase {
  protected collaboratorsTable: string = "mangarosa_collaborators";
  protected collaboratorsKnowledgesTable: string =
    "mangarosa_collaborators_knowledges";

  public async registerCollaborator(
    collaborator: CollaboratorOutputDTO,
    knowledges: KnowledgesOutputDTO
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert(collaborator)
        .into(this.collaboratorsTable);

      await this.getConnection()
        .insert({
          collaborator_id: collaborator.id,
          knowledge_1: knowledges.first,
          knowledge_2: knowledges.second || null,
          knowledge_3: knowledges.third || null,
        })
        .into(this.collaboratorsKnowledgesTable);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllCollaborators(): Promise<Array<Collaborator>> {
    try {
      const collaborators = await this.getConnection()
        .select(
          `${this.collaboratorsTable}.*`,
          `${this.collaboratorsKnowledgesTable}.knowledge_1`,
          `${this.collaboratorsKnowledgesTable}.knowledge_2`,
          `${this.collaboratorsKnowledgesTable}.knowledge_3`
        )
        .from(this.collaboratorsTable)
        .join(
          `${this.collaboratorsKnowledgesTable}`,
          `${this.collaboratorsTable}.id `,
          `=`,
          `${this.collaboratorsKnowledgesTable}.collaborator_id`
        )
        .orderBy(`name`);
      return collaborators;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async validateCollaborator(id: string): Promise<void> {
    try {
      await this.getConnection()
        .update("validated", "1")
        .update("date", new Date())
        .from(this.collaboratorsTable)
        .where({ id, validated: "0" });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async unvalidateCollaborator(id: string): Promise<void> {
    try {
      await this.getConnection()
        .update("validated", "0")
        .update({ date: null })
        .from(this.collaboratorsTable)
        .where({ id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new CollaboratorDatabase();

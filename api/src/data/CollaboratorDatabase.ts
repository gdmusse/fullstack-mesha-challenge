import { BaseDatabase } from "./BaseDatabase";
import { Collaborator, CollaboratorOutputDTO } from "../model/Collaborator";

export class CollaboratorDatabase extends BaseDatabase {
  protected collaboratorsTable: string = "mangarosa_collaborators";
  protected collaboratorsKnowledgesTable: string = "mangarosa_collaborators_knowledges";

  public async registerCollaborator( collaborator: CollaboratorOutputDTO,
    knowledges: Array<string>): Promise<void> {
    try {
      await this.getConnection().insert(collaborator).into(this.collaboratorsTable);

      await this.getConnection()
        .insert({
          collaborator_id: collaborator.id,
          knowledge_1: knowledges[0],
          knowledge_2: knowledges[1] || null,
          knowledge_3: knowledges[2] || null,
        })
        .into(this.collaboratorsKnowledgesTable);
        
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }


}

export default new CollaboratorDatabase();

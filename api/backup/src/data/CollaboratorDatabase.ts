import { BaseDatabase } from "./BaseDatabase";
import { CollaboratorOutputDTO } from "../model/Collaborator";

export class CollaboratorDatabase extends BaseDatabase {
  protected collaboratorsTable: string = "mangarosa_collabolators";
  protected collaboratorsKnowledgesTable: string = "mangarosa_collaborators_knowledges";
  protected collectionTable: string = "labephoto_collections";
  protected collectionPhotosTable: string = "labephoto_collection_photos";

  public async registerCollaborator(collection: any, any: any): Promise<void> {
    try {
      await this.getConnection().insert(collection).into(this.collectionTable);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

/*   public async registerCollaborator(
    collaborator: CollaboratorOutputDTO,
    knowledges: Array<string>
  ): Promise<void> {
    try {
      console.log("database", )
      await this.getConnection()
      .insert(collaborator)
      .into(this.collaboratorsTable);

      console.log("cheguei")

   

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
  } */

  /*  public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await this.getConnection()
        .select()
        .from(this.tableName)
        .where({ email });

      return this.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByNickname(nickname: string): Promise<User | undefined> {
    try {
      const result = await this.getConnection()
        .select()
        .from(this.tableName)
        .where({ nickname });

      return this.toUserModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  } */
}

export default new CollaboratorDatabase();

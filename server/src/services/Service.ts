import {
  CreateNodeType,
  ReadNodeType,
  UpdateNodeType,
} from "../api/middleware/zodSchemas/NoteTreeZodSchema";
import Repository from "../database/repository/Repository";

class Service {
  private Repo: Repository;
  constructor() {
    this.Repo = new Repository();
  }

  async CreateNewNodeService(input: CreateNodeType["body"]) {
    try {
      return this.Repo.CreateNode(input);
    } catch (error) {
      throw error;
    }
  }

  async InsertNodeService(input: CreateNodeType["body"]) {
    try {
      return this.Repo.InsertNode(input);
    } catch (error) {
      throw error;
    }
  }

  async RetrieveNodesService(input: ReadNodeType["params"]) {
    try {
      return this.Repo.RetrieveNodes(input);
    } catch (error) {
      throw error;
    }
  }

  async RetrieveNodeNamesService(input: ReadNodeType["params"]) {
    try {
      return this.Repo.RetrieveNodeNames(input);
    } catch (error) {
      throw error;
    }
	}
	
  async UpdateNodeService(input: UpdateNodeType["body"]) {
    try {
      return this.Repo.UpdateNode(input);
    } catch (error) {
      throw error;
    }
  }
}

export default Service;

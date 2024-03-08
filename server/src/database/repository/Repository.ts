import {
  CreateNodeType,
  ReadNodeType,
  UpdateNodeType,
} from "../../api/middleware/zodSchemas/NoteTreeZodSchema";
import CustomError from "../../utils/CustomError";
import Utils from "../../utils/Utils";
import NodeModel from "../model/NodeTree.model";

class Repository {
  async CreateNode(input: CreateNodeType["body"]) {
    try {
      const newNode = await NodeModel.create(input);
      if (!newNode)
        throw new CustomError(400, "Error while creating new node " + newNode);

      const nodes = await NodeModel.find({ username: input.username });
      return {
        nodeTree: Utils.buildHierarchy(nodes)[0],
        nodeNames: nodes.map((node) => node.node),
      };
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while creating new node " + error
      );
    }
  }

  async InsertNode(input: CreateNodeType["body"]) {
    try {
      const { username, node, path } = input;
      const nodes = await NodeModel.find({ username });

      if (!nodes || nodes.length === 0)
        throw new CustomError(
          404,
          "Nodes was not found or data is not available" + nodes
        );

      const newAbsolutePath = Utils.defineAbsolutePath(nodes, path);

      if (!newAbsolutePath)
        throw new CustomError(404, "Node was not found!" + newAbsolutePath);

      const newNode = await NodeModel.create({
        username,
        node,
        path: newAbsolutePath,
      });

      if (!newNode)
        throw new CustomError(
          500,
          "Error while inserting new error..." + nodes
        );

      const updatedNodes = await NodeModel.find({ username });

      return {
        nodeTree: Utils.buildHierarchy(updatedNodes)[0],
        nodeNames: updatedNodes.map((node) => node.node),
      };
    } catch (error) {
      throw error;
    }
  }

  async RetrieveNodes(input: ReadNodeType["params"]) {
    try {
      const { username } = input;

      const nodes = await NodeModel.find({ username });
      if (nodes.length === 0) return [];
      const hierarchy = Utils.buildHierarchy(nodes)[0];

      return hierarchy;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async RetrieveNodeNames(input: ReadNodeType["params"]) {
    try {
      const { username } = input;

      const nodes = await NodeModel.find({ username });

      if (!nodes || nodes.length === 0) return [];

      return nodes.map((node) => node.node);
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async UpdateNode(input: UpdateNodeType["body"]) {
    try {
      const { username, node, updatedNodeName, method } = input;

      if (method === "remove") {
        const removeNode = await NodeModel.findOneAndDelete({ username, node });

        const regex = new RegExp(`/${node}/`);

        const removeNodeSubnodes = await NodeModel.deleteMany({
          username,
          path: { $regex: regex },
        });

        if (!removeNodeSubnodes || !removeNode) {
          throw new CustomError(500, "Error while removing node...");
        } else {
          const nodes = await NodeModel.find({ username });
          return {
            nodeTree: Utils.buildHierarchy(nodes)[0],
            nodeNames: nodes.map((node) => node.node),
          };
        }
      } else if (method === "update") {
        const updatedNode = await NodeModel.findOneAndUpdate(
          { username, node },
          { $set: { node: updatedNodeName } },
          { new: true }
        );

        const regexUpdate = new RegExp(`/${node}/`);

        const subNodes = await NodeModel.find({
          username,
          path: { $regex: regexUpdate },
        });

        for (const subNode of subNodes) {
          const newPath = subNode.path.replace(
            `/${node}/`,
            `/${updatedNodeName}/`
          );
          await NodeModel.updateOne(
            { _id: subNode._id },
            {
              $set: { path: newPath },
            }
          );
        }

        if (!updatedNode) {
          throw new CustomError(500, "Node not found or update failed");
        } else {
          const nodes = await NodeModel.find({ username });
          return {
            nodeTree: Utils.buildHierarchy(nodes)[0],
            nodeNames: nodes.map((node) => node.node),
          };
        }
      }
    } catch (error) {}
  }
}

export default Repository;

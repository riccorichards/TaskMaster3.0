import {
  CreateNodeType,
  ReadNodeType,
  UpdateNodeType,
} from "../../api/middleware/zodSchemas/NoteTreeZodSchema";
import {
  CreateTaskType,
  DeleteTaskType,
  UpdateTaskType,
} from "../../api/middleware/zodSchemas/TaskZodSchema";
import {
  LoginUserType,
  NewJourneyType,
  RegisterUserType,
} from "../../api/middleware/zodSchemas/UserAuthZodSchema";
import CustomError from "../../utils/CustomError";
import Utils from "../../utils/Utils";
import HistoryModel from "../model/History.model";
import NodeModel from "../model/NodeTree.model";
import SessionModel from "../model/Session.model";
import TaskModel from "../model/Task.model";
import UserModel from "../model/User.model";
import { TaskDocument } from "../type";

class Repository {
  async Register(input: RegisterUserType["body"]) {
    try {
      const newUser = await UserModel.create({
        ...input,
        journeyDuration: null,
      });

      if (!newUser) throw new CustomError(400, "Bad request!");

      return await newUser.save();
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while creating new node " + error
      );
    }
  }

  async Login(input: LoginUserType["body"], userAgent: string) {
    try {
      const { email, password } = input;
      const user = await UserModel.findOne({ email });
      if (!user) throw new CustomError(404, "Wrong credentials!");
      const validUser = user.comparePass(password);
      if (!validUser) throw new CustomError(404, "Wrong credentials!");

      const newSession = await SessionModel.create({
        user: user._id,
        userAgent,
      });
      const savedSession = await newSession.save();

      return savedSession;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while creating new node " + error
      );
    }
  }

  async FindMe(id: string) {
    try {
      const profile = await UserModel.findById(id);
      if (!profile)
        throw new CustomError(
          404,
          "Profile was not found with provided ID: " + id
        );

      return profile;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while creating new node " + error
      );
    }
  }

  async NewJourney(id: string, input: NewJourneyType["body"]) {
    try {
      const profile = await UserModel.findByIdAndUpdate(id, input, {
        new: true,
      });

      if (!profile)
        throw new CustomError(
          400,
          "Profile was not found or thrown error while updating process"
        );

      return await profile.save();
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while creating new node " + error
      );
    }
  }
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

  async CreateTask(input: CreateTaskType["body"], author: string) {
    try {
      const task = await TaskModel.create({ ...input, author });

      if (!task) throw new CustomError(400, "Bad request or invalid data");

      return await task.save();
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async ReadTasks(author: string) {
    try {
      const tasks = await TaskModel.find({ author });

      if (!tasks) throw new CustomError(400, "Bad request or invalid data");

      if (tasks.length === 0) return [];
      return tasks.reverse();
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async UpdateTask(
    id: UpdateTaskType["params"],
    input: UpdateTaskType["body"]
  ) {
    try {
      const { taskId } = id;
      const task = await TaskModel.findByIdAndUpdate(taskId, input, {
        new: true,
      });
      if (!task) throw new CustomError(400, "Bad request or invalid data");
      return await task.save();
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async DeleteTask(input: DeleteTaskType["params"]) {
    try {
      const { taskId } = input;
      return await TaskModel.findByIdAndDelete(taskId);
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async DayFinish(author: string) {
    try {
      const dailyTasks = await TaskModel.find({ author });
      if (dailyTasks.length === 0)
        throw new CustomError(400, "Tasks was not defined");

      await Promise.all(
        dailyTasks.map(async (dailyTask: TaskDocument) => {
          const {
            _id,
            createdAt,
            author,
            workspace,
            complete,
            storedTime,
            task,
            priority,
          } = dailyTask;

          const storedTask = await HistoryModel.create({
            createdAt,
            author,
            workspace,
            complete,
            storedTime,
            task,
            priority,
          });

          if (!storedTask)
            throw new CustomError(
              400,
              "Error while converting task into history"
            );
          const removedTask = await TaskModel.findByIdAndDelete(_id);
          if (!removedTask)
            throw new CustomError(400, "Error while removing task: " + _id);
        })
      );

      const result = await HistoryModel.find({ author });
      return result;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async GetDayFinish(author: string, amount: string) {
    try {
      let myHistory: any;
      if (amount === "all") {
        myHistory = await HistoryModel.find({ author }).sort({ createdAt: -1 });
      } else {
        myHistory = await HistoryModel.find({ author })
          .sort({ createdAt: -1 })
          .limit(10);
      }

      if (myHistory.length === 0) return [];

      return myHistory;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async FilterHistory(author: string, field: string, originValue: string) {
    const intArray = ["1", "0"];

    let value: number | boolean | string = originValue;

    if (intArray.includes(originValue)) {
      value = parseInt(originValue, 10);
      if (value < 2) {
        value = Boolean(value);
      }
    }
    let query: { [key: string]: any } = { author };
    query[field] = value;

    const items = parseInt(originValue);
    try {
      let filteredData;
      if (field !== "list") {
        filteredData = await HistoryModel.find(query);
      } else {
        filteredData = (await HistoryModel.find()).splice(
          0,
          parseInt(originValue, 10)
        );
      }
      if (!filteredData || filteredData.length === 0) return [];
      return filteredData;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async DailyResuly(author: string) {
    try {
      const history = await HistoryModel.find({ author });
      if (history.length === 0) return [];
      // Create a map to group tasks by date
      const groupedTasks = new Map();

      // Populate the map with tasks grouped by date
      for (const task of history) {
        const date = Utils.extractDate(task.createdAt || ""); // Get only the date portion
        const existingTasks = groupedTasks.get(date) || [];
        groupedTasks.set(date, [...existingTasks, task]);
      }

      // Calculate the completion percentage for each group
      const result = Array.from(groupedTasks).map(([date, dailyTasks]) => {
        const doneTasks = dailyTasks.filter(
          (task: any) => task.complete
        ).length;
        return {
          date,
          value: (doneTasks / dailyTasks.length) * 100,
        };
      });

      return result;
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async GetMyStats(userId: string) {
    try {
      const profile = await UserModel.findById(userId);
      if (!profile) throw new CustomError(404, "user was not found");

      let remainingDays;
      let usedTime;
      let perDay;
      if (profile.journeyDuration && profile.allocatedTime) {
        const history = await HistoryModel.find({ author: userId });
        if (history.length === 0) return [];
        const totalWorkingHours = history.reduce(
          (acc, task) => acc + task.storedTime!,
          0
        );
        remainingDays = Utils.defineRemainDays(
          profile.journeyDuration,
          history[0].createdAt || ""
        ).result;
        usedTime = (totalWorkingHours / (profile.allocatedTime * 3600)) * 100;
        perDay =
          profile.allocatedTime /
          Utils.defineRemainDays(
            profile.journeyDuration,
            history[0].createdAt || ""
          ).differenceInDays;
      }
      return { remainingDays, usedTime, perDay };
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }

  async TopLearnedTopics(author: string) {
    try {
      const history = await HistoryModel.find({ author });

      if (history.length === 0) return [];

      const groupedTasks = new Map<any, any>();

      for (const task of history) {
        const workspace = task.workspace;
        const existingEntry = groupedTasks.get(workspace) || {
          tasks: [],
          totalStoredTime: 0,
          completeTasks: 0,
        };
        existingEntry.tasks.push(task);
        existingEntry.totalStoredTime += task.storedTime;
        if (task.complete) {
          existingEntry.completeTasks += 1;
        }

        groupedTasks.set(workspace, existingEntry);
      }

      const result: { name: string; value: number }[] = [];

      groupedTasks.forEach((value, key) => {
        const totalTasks = value.tasks.length * 0.04;
        const totalStoredTime = value.totalStoredTime * 0.035;
        const completionRate =
          (value.completeTasks / value.tasks.length) * 100 * 0.025;

        result.push({
          name: key,
          value: totalStoredTime + totalTasks + completionRate,
        });
      });

      return result.sort((a, b) => b.value - a.value);
    } catch (error) {
      throw new CustomError(
        500,
        "An error occurred while retrieve users' nodes" + error
      );
    }
  }
}

export default Repository;

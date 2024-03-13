import {
  CreateNodeType,
  ReadNodeType,
  UpdateNodeType,
} from "../api/middleware/zodSchemas/NoteTreeZodSchema";
import {
  CreateTaskType,
  DeleteTaskType,
  UpdateTaskType,
} from "../api/middleware/zodSchemas/TaskZodSchema";
import {
  LoginUserType,
  NewJourneyType,
  RegisterUserType,
} from "../api/middleware/zodSchemas/UserAuthZodSchema";
import Repository from "../database/repository/Repository";

class Service {
  private Repo: Repository;
  constructor() {
    this.Repo = new Repository();
  }

  async RegisterService(input: RegisterUserType["body"]) {
    try {
      return this.Repo.Register(input);
    } catch (error) {
      throw error;
    }
  }

  async LoginService(input: LoginUserType["body"], userAgent: string) {
    try {
      return this.Repo.Login(input, userAgent);
    } catch (error) {
      throw error;
    }
  }

  async FindMeService(id: string) {
    try {
      return this.Repo.FindMe(id);
    } catch (error) {
      throw error;
    }
  }

  async NewjourneyService(id: string, input: NewJourneyType["body"]) {
    try {
      return this.Repo.NewJourney(id, input);
    } catch (error) {
      throw error;
    }
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

  async CreateTaskService(input: CreateTaskType["body"], author: string) {
    try {
      return this.Repo.CreateTask(input, author);
    } catch (error) {
      throw error;
    }
  }

  async ReadTasksService(author: string) {
    try {
      return this.Repo.ReadTasks(author);
    } catch (error) {
      throw error;
    }
  }

  async UpdateTaskService(
    taskId: UpdateTaskType["params"],
    input: UpdateTaskType["body"]
  ) {
    try {
      return this.Repo.UpdateTask(taskId, input);
    } catch (error) {
      throw error;
    }
  }

  async DeleteTaskService(taskId: DeleteTaskType["params"]) {
    try {
      return this.Repo.DeleteTask(taskId);
    } catch (error) {
      throw error;
    }
  }

  async DayFinishService(author: string) {
    try {
      return this.Repo.DayFinish(author);
    } catch (error) {
      throw error;
    }
  }

  async GetDayFinishService(author: string, amount: string) {
    try {
      return this.Repo.GetDayFinish(author, amount);
    } catch (error) {
      throw error;
    }
  }

  async FilterHistoryService(author: string, field: string, value: string) {
    try {
      return this.Repo.FilterHistory(author, field, value);
    } catch (error) {
      throw error;
    }
  }

  async DailyResulyService(author: string) {
    try {
      return this.Repo.DailyResuly(author);
    } catch (error) {
      throw error;
    }
  }

  async MyStatsService(userId: string) {
    try {
      return this.Repo.GetMyStats(userId);
    } catch (error) {
      throw error;
    }
  }

  async TopLearnedTopicsService(userId: string) {
    try {
      return this.Repo.TopLearnedTopics(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default Service;

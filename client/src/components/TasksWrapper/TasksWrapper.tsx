import TaskCard from "../TaskCard/TaskCard";
import "./TasksWrapper.css";

const fakeTasks = [
  {
    id: 1,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "high",
  },
  {
    id: 2,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "medium",
  },
  {
    id: 3,
    workspace: "Data structure",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "easy",
  },
  {
    id: 4,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "high",
  },
  {
    id: 5,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "high",
  },
  {
    id: 6,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "medium",
  },
  {
    id: 7,
    workspace: "Data structure",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "easy",
  },
  {
    id: 8,
    workspace: "Blockchain",
    task: "this is an example",
    storedTime: "00:53:19",
    priority: "high",
  },
];

const TasksWrapper = () => {
  return (
    <div className="tasks-wrapper">
      {fakeTasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
};

export default TasksWrapper;

import { BsDatabaseExclamation } from "react-icons/bs";

const TaskNotChosen = () => {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        fontSize: "18px",
        height: "25vh",
        fontWeight: "bold",
      }}
    >
      <BsDatabaseExclamation style={{ fontSize: "24px", color: "#fb2985" }} />
      Tasks was not defined!
    </span>
  );
};

export default TaskNotChosen;

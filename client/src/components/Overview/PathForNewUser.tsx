import { GiPathDistance } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const PathForNewUser = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        backgroundColor: "#ccd0cf",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <GiPathDistance style={{ fontSize: "100px" }} />
      <p>Empower Your Journey: Personalize Your Path to Success.</p>
      <button
        onClick={() => navigate("/dashboard/road-map")}
        className="new-user-btn"
      >
        Create your path
      </button>
    </div>
  );
};

export default PathForNewUser;

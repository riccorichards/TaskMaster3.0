import { SiProbot } from "react-icons/si";
import { IoIosRemoveCircle } from "react-icons/io";
import { useBotStore } from "../../store/BotStore";
import { useEffect } from "react";

const BotList = () => {
  const { roles, getBotRoles, removeBot, getPickedRole, pickedRole } =
    useBotStore();

  useEffect(() => {
    getBotRoles();
  }, [getBotRoles]);

  const handleRemoveBot = (botId: string) => {
    removeBot(botId);
  };

  useEffect(() => {
    if (roles.length > 0) {
      getPickedRole(roles[0].role);
    }
  }, [getPickedRole, roles]);

  const handlePickInterviewer = (role: string) => {
    getPickedRole(role);
  };
  return (
    <div className="bot-list">
      {roles.length > 0 ? (
        roles.map((el) => (
          <div
            className="single-bot"
            key={el._id}
            style={{
              border: pickedRole === el.role ? "1px solid orangered" : "",
            }}
            onClick={() => handlePickInterviewer(el.role)}
          >
            <IoIosRemoveCircle
              className="remove-bot-btn "
              onClick={() => handleRemoveBot(el._id)}
            />
            <div className="single-bot-icon">
              <SiProbot />
            </div>
            <span className="single-bot-role">{el.role}</span>
          </div>
        ))
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9baab8",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Roles was not found!</span>
            <span
              style={{
                backgroundColor: "#253745",
                padding: "5px",
                color: "#9baab8",
                borderRadius: "3.5px",
              }}
            >
              Please, add new role with{" "}
              <span style={{ color: "orangered" }}>"New Bot"</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotList;

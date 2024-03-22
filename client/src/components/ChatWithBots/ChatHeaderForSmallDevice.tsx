import { MdOutlineAddReaction } from "react-icons/md";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";
import { SiProbot } from "react-icons/si";
const take = [
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interxcdjk hdkjchdkjc hsdkjchd" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
  { bot: SiProbot, role: "interviewer" },
];
const ChatHeaderForSmallDevice = () => {
  const [isOpenBotList, setIsOpenBotList] = useState<boolean>(false);
  const [addBot, setAddBot] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  return (
    <div className="chat-header-for-small-device">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          position: "relative",
        }}
      >
        Select role
        {!isOpenBotList ? (
          <FaCaretDown onClick={() => setIsOpenBotList(!isOpenBotList)} />
        ) : (
          <FaCaretUp onClick={() => setIsOpenBotList(!isOpenBotList)} />
        )}
        {isOpenBotList && (
          <div
            style={{
              height: "25vh",
              width: "200px",
              position: "absolute",
              top: "105%",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              backgroundColor: "#ccd0cf",
              padding: "5px",
            }}
          >
            {take.map((el) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "5px",
                  boxShadow: "0 0 1px #06141b",
                  borderRadius: "2.5px",
                }}
              >
                <span>{<el.bot />}</span>
                <span>{el.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <MdOutlineAddReaction
        style={{ fontSize: "18px" }}
        onClick={() => setAddBot(!addBot)}
      />
      {addBot && (
        <input
          className="generate-bot-input"
          placeholder="Generate new bot"
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRole(e.target.value)
          }
        />
      )}
    </div>
  );
};

export default ChatHeaderForSmallDevice;

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

const BotList = () => {
  return (
    <div className="bot-list">
      {take.map((el) => (
        <div className="single-bot">
          <div className="single-bot-icon">{<el.bot />}</div>
          <span className="single-bot-role">{el.role}</span>
        </div>
      ))}
    </div>
  );
};

export default BotList;

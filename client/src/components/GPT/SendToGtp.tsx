import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useGptStore } from "../../store/GPTStore";

const SendToGtp = () => {
  const [message, setMessage] = useState<string>("");
  const { sentToGpt, msgTaker } = useGptStore();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;

    msgTaker({ message, role: "user" });

    sentToGpt({ message });
    setMessage("");
  };

  return (
    <form onSubmit={onSubmit} id="form-gpt">
      <textarea
        rows={2}
        className="gpt-input"
        value={message}
        onChange={onChange}
        placeholder="How can I help you?"
      />
      <button className="gpt-btn" type="submit">
        <FaArrowUp />
      </button>
    </form>
  );
};
export default SendToGtp;

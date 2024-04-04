import { FC, useEffect } from "react";
import Utils from "../../utils/Utils";
import gpt from "../../assets/chatGPT.jpg";

const GptResponse: FC<{ message: string; i: number }> = ({ message, i }) => {
  useEffect(() => {
    Utils.typeWriter(`chat-response-${i}`, message, 10);
  }, [message, i]);

  return (
    <div style={{ display: "flex", gap: "10px" }} id="chat-response">
      <img
        src={gpt}
        alt="user-img"
        style={{ width: "35px", height: "35px", objectFit: "cover" }}
      />
      <span
        id={`chat-response-${i}`}
        style={{
          padding: "3.5px 5px",
          backgroundColor: "#06141b",
          color: "#9baab8",
          borderRadius: "0 5px 5px 5px",
        }}
      />
    </div>
  );
};

export default GptResponse;

import { FC } from "react";
import { MdDone } from "react-icons/md";

const DefineItems: FC<{
  items: string | null;
  setItems: (v: string | null) => void;
  filterhandler: (v: string, items: string) => void;
}> = ({ items, setItems, filterhandler }) => {
  const handleClick = (items: string) => {
    setItems(items);
    filterhandler("list", items);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        padding: "5px",
        borderRadius: "3.5px",
        backgroundColor: "#fff",
        right: "165px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100px",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          borderBottom: "1px solid black",
        }}
        onClick={() => handleClick("10")}
      >
        10
        {items === "10" && <MdDone />}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          borderBottom: "1px solid black",
        }}
        onClick={() => handleClick("15")}
      >
        15
        {items === "15" && <MdDone />}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
        }}
        onClick={() => handleClick("20")}
      >
        20
        {items === "20" && <MdDone />}
      </span>
    </div>
  );
};

export default DefineItems;

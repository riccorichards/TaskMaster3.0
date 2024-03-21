import React, { FC, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useTaskStore } from "../../store/TaskStore";

const FilterController: FC<{ historyLen: number }> = ({ historyLen }) => {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customFilter, setCustomFilter] = useState<string>("");
  const { filterHistory, getHistory } = useTaskStore();
  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout> | null | number
  >(null);

  const [errorHandler, setErrorHandler] = useState<string | null>(null);
  const possibleFields = ["priority", "workspace"];

  useEffect(() => {
    if (customFilter === "") {
      getHistory("10");
    }
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout, customFilter, getHistory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setCustomFilter(inputValue);
    const [field, value] = inputValue.split(":");
    const newTimeout = setTimeout(() => {
      if (possibleFields.includes(field)) {
        setErrorHandler(null);
        filterHistory(field, value);
      } else {
        setErrorHandler("Valid format is ==> workspace:some work");
      }
    }, 500);
    setSearchTimeout(newTimeout);
  };

  const filterhandler = (field: string, type?: string) => {
    let value: string = "";
    if (field === "complete") {
      if (type === "true") value = "1";
      if (type === "false") value = "0";
    }
    filterHistory(field, value);
  };

  const handleAllHistory = (amount: string) => {
    getHistory(amount);
  };

  return (
    <div className="active-filter">
      <span>Acts: {historyLen}</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          position: "relative",
        }}
      >
        <button
          style={{ border: "1px solid" }}
          onClick={() => handleAllHistory("all")}
        >
          All
        </button>

        <button
          style={{ backgroundColor: "#06141b", color: "#fff" }}
          onClick={() => filterhandler("complete", "true")}
        >
          Done
        </button>
        <button
          style={{ backgroundColor: "#9baab8", color: "#fff" }}
          onClick={() => filterhandler("complete", "false")}
        >
          Failed
        </button>
        <button
          style={{ border: "1px solid" }}
          onClick={() => setIsCustom(!isCustom)}
        >
          {isCustom ? "Hide" : "Custom"}
        </button>
        {isCustom && (
          <div className="custom-filter-input">
            <input
              type="text"
              value={customFilter}
              onChange={handleSearchChange}
              placeholder="priority:high"
              style={{ backgroundColor: "transparent" }}
            />
            {customFilter !== "" && (
              <IoMdCloseCircle onClick={() => setCustomFilter("")} />
            )}
            {errorHandler && isCustom && (
              <p
                style={{
                  position: "absolute",
                  right: "0",
                  top: "100%",
                  color: "red",
                  fontSize: "12px",
                  backgroundColor: "#fff",
                  padding: "3.5px",
                }}
              >
                {errorHandler}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterController;

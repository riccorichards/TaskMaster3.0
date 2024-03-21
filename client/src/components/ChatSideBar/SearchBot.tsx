import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBot = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="search-bot">
      <input
        placeholder="Search bot's role"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        value={search}
      />
      <div className="search-bot-icon">
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchBot;

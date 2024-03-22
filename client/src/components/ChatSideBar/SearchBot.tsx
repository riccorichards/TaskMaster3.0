import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useBotStore } from "../../store/BotStore";

const SearchBot = () => {
  const [search, setSearch] = useState<string>("");
  const { searchBot } = useBotStore();
  const [searchTimeout, setSearchTimeout] = useState<
    ReturnType<typeof setTimeout> | null | number
  >(null);

  const handleSearchBot = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);

    const newTimer = setTimeout(() => {
      searchBot(newSearchValue);
    }, 500);

    setSearchTimeout(newTimer);
  };

  return (
    <div className="search-bot">
      <input
        placeholder="Search bot's role"
        onChange={handleSearchBot}
        value={search}
      />
      <div className="search-bot-icon">
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchBot;

import React from "react";
import { useState } from "react";

import "../style/Search.css";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        onChange={(e) => onInputChange(e.target.value)}
        className="search"
        placeholder="🔍"
        type="text"
      />
    </div>
  );
};

export default Search;

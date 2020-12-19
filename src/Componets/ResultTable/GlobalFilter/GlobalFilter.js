import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="input-group mb-3">
      <input
        placeholder='Глобальный поиск'
        type='text'
        value={filter || ""}
        onChange={(e) => { setFilter(e.target.value); }} />
    </div>

  );
};

export default GlobalFilter;

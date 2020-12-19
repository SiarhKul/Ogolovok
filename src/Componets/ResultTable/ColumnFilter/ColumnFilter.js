
const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="input-group mb-3">
      <input
        placeholder="Поиск"
        type="text"
        value={filterValue || ""}
        onChange={(e) => { setFilter(e.target.value); }} />
    </div>
  );
};

export default ColumnFilter;

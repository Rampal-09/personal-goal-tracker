import style from "./GoalFilter.module.css";

const GoalFilter = ({
  handleFilterChange,
  handlePriorityChange,
  handleSortChange,
}) => {
  return (
    <div className={style.filterPad}>
      <p>Filter</p>
      <div className={style.filterSelect}>
        <select onChange={(e) => handlePriorityChange(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <p>status</p>
      <div className={style.filterBtn}>
        <button onClick={() => handleFilterChange("all")}>all</button>
        <button onClick={() => handleFilterChange("complete")}>complete</button>
        <button onClick={() => handleFilterChange("pending")}>pending</button>
      </div>

      <p>Sort by</p>
      <div className={style.sortBtn}>
        <button onClick={() => handleSortChange("priority")}>priority</button>
        <button onClick={() => handleSortChange("deadline")}>deadline</button>
        <button onClick={() => handleSortChange("none")}>none</button>
      </div>
    </div>
  );
};

export default GoalFilter;
